from fastapi import APIRouter, HTTPException
from models.challenge_schemas import ChallengeRequest, ChallengeResponse
from services.challenge_evaluator import evaluate_prompt_challenge

router = APIRouter(prefix="/api/v1/challenge", tags=["Prompt Challenge"])

@router.post("/evaluate", response_model=ChallengeResponse)
async def evaluate_challenge(request: ChallengeRequest):
    try:
        return await evaluate_prompt_challenge(request)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
