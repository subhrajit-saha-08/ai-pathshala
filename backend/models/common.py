from typing import Any
from pydantic import BaseModel, Field

class ErrorResponse(BaseModel):
    status_code: int = Field(description="The HTTP status code of the error")
    message: str = Field(description="A human-readable error message explaining what went wrong")
    details: Any = Field(default=None, description="Optional detailed error breakdown, such as validation errors from Pydantic")
