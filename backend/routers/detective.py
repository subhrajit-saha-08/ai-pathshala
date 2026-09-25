from fastapi import APIRouter, HTTPException
from models.detective_schemas import DetectiveRequest, DetectiveResponse
from services.detective_evaluator import evaluate_prompt_detective

router = APIRouter(prefix="/api/v1/detective", tags=["Prompt Detective"])

@router.post("/evaluate", response_model=DetectiveResponse)
async def evaluate_detective(request: DetectiveRequest):
    try:
        return await evaluate_prompt_detective(request)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
