from pydantic import BaseModel, Field

class ChallengeRequest(BaseModel):
    challenge_id: str
    user_prompt: str
    constraints: list[str]

class ChallengeResponse(BaseModel):
    score: int = Field(description="The score out of 100 based on how well the prompt met the constraints")
    feedback: str = Field(description="Constructive feedback for the user")
    constraints_met: list[str]
    constraints_missed: list[str]
