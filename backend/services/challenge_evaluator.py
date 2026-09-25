import asyncio
from google.genai import types
from services.gemini_client import client
from models.challenge_schemas import ChallengeRequest, ChallengeResponse

async def evaluate_prompt_challenge(request: ChallengeRequest) -> ChallengeResponse:
    system_instruction = (
        "You are a strict but fair educational judge evaluating a kid's prompt. "
        "Your job is to check if their prompt successfully meets all the specified constraints. "
        "Grade their prompt fairly on a scale of 0 to 100 based on how well the constraints were followed."
    )
    
    prompt_text = (
        f"User Prompt to Evaluate: {request.user_prompt}\n\n"
        f"Constraints to meet:\n" + "\n".join(f"- {c}" for c in request.constraints)
    )

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt_text,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=ChallengeResponse,
                    system_instruction=system_instruction
                )
            )
            return ChallengeResponse.model_validate_json(response.text)
        except Exception as e:
            error_msg = str(e).lower()
            if attempt < max_retries - 1 and ("503" in error_msg or "429" in error_msg or "unavailable" in error_msg):
                await asyncio.sleep(2 ** attempt)  # Exponential backoff: 1s, 2s
                continue
            raise ValueError(f"Failed to evaluate prompt using Gemini API: {str(e)}")
