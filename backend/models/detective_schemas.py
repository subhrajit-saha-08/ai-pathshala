from pydantic import BaseModel, Field

class DetectiveRequest(BaseModel):
    paragraph_id: str
    user_guess: str
    target_keywords: list[str]

class DetectiveResponse(BaseModel):
    match_percentage: int = Field(description="The percentage match between the user_guess and the target_keywords, from 0 to 100")
    hint: str = Field(description="A helpful, educational hint for the user on what they missed, without revealing the exact missing keywords")
    keywords_found: list[str]
    keywords_missed: list[str]
