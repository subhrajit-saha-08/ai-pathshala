# Spark School - Backend Architecture

## Tech Stack
* Framework: FastAPI
* Validation: Pydantic
* Server: Uvicorn
* AI Engine: Gemini API (google-genai SDK)
* Middleware: CORSMiddleware (Must strictly allow http://localhost:3000)

## API Contracts & Data Models

### 1. Activity 4: Prompt Challenge Cards
* **Endpoint:** `POST /api/v1/challenge/evaluate`
* **Purpose:** Evaluates a user's prompt against specific constraints using LLM-as-a-judge.
* **Request JSON Schema:**
```json
{
  "challenge_id": "string",
  "user_prompt": "string",
  "constraints": [
    "string",
    "string"
  ]
}
```
* **Response JSON Schema:**
```json
{
  "score": 0,
  "feedback": "string",
  "constraints_met": [
    "string"
  ],
  "constraints_missed": [
    "string"
  ]
}
```

### 2. Activity 5: Prompt Detective
* **Endpoint:** `POST /api/v1/detective/evaluate`
* **Purpose:** Compares a user's guessed prompt against hidden target keywords.
* **Request JSON Schema:**
```json
{
  "paragraph_id": "string",
  "user_guess": "string",
  "target_keywords": [
    "string",
    "string"
  ]
}
```
* **Response JSON Schema:**
```json
{
  "match_percentage": 0,
  "hint": "string",
  "keywords_found": [
    "string"
  ],
  "keywords_missed": [
    "string"
  ]
}
```

## LLM System Constraints
* All Gemini API evaluations MUST utilize the `response_schema` parameter for Structured Outputs.
* The API calls must be passed the explicit Pydantic response models defined in our schemas to guarantee type-safe, strict JSON output.
* The LLM must not include markdown formatting, conversational filler, or backticks in its output string.
