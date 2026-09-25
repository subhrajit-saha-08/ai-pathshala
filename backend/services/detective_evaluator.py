import asyncio
from google.genai import types
from services.gemini_client import client
from models.detective_schemas import DetectiveRequest, DetectiveResponse

async def evaluate_prompt_detective(request: DetectiveRequest) -> DetectiveResponse:
    system_instruction = (
        "You are an encouraging but strict judge for a 'Prompt Detective' game. "
        "Your job is to compare a user's guess against a list of hidden target keywords. "
        "Calculate an exact match percentage (0 to 100) based on how many target keywords the user guessed correctly. "
        "Provide a helpful, educational hint about what is missing WITHOUT revealing the actual missing keywords."
    )
    
    prompt_text = (
        f"User Guess: {request.user_guess}\n\n"
        f"Target Keywords to find:\n" + "\n".join(f"- {k}" for k in request.target_keywords)
    )

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt_text,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=DetectiveResponse,
                    system_instruction=system_instruction
                )
            )
            return DetectiveResponse.model_validate_json(response.text)
        except Exception as e:
            error_msg = str(e).lower()
            if attempt < max_retries - 1 and ("503" in error_msg or "429" in error_msg or "unavailable" in error_msg):
                await asyncio.sleep(2 ** attempt)  # Exponential backoff: 1s, 2s
                continue
            raise ValueError(f"Failed to evaluate prompt detective guess using Gemini API: {str(e)}")
