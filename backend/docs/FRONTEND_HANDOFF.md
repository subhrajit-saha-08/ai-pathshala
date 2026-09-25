# Spark School Backend - Frontend Integration Guide

## Base URL
Ensure your local Next.js environment variables include:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 1. Activity 4: Prompt Challenge
**Endpoint:** `POST /api/v1/challenge/evaluate`

### Request Payload (ChallengeRequest)
```json
{
  "challenge_id": "string",
  "user_prompt": "string",
  "constraints": [
    "string"
  ]
}
```

### Response Payload (ChallengeResponse)
```json
{
  "score": 85,
  "feedback": "Great job! You included the dragon, but the story is only 2 sentences instead of 3.",
  "constraints_met": [
    "Include a dragon"
  ],
  "constraints_missed": [
    "Must be 3 sentences"
  ]
}
```

### Next.js Fetch Example
```javascript
const evaluateChallenge = async (payload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/challenge/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) throw new Error("Backend validation or LLM failure");
  return await response.json(); // Returns ChallengeResponse schema
};
```

---

## 2. Activity 5: Prompt Detective
**Endpoint:** `POST /api/v1/detective/evaluate`

### Request Payload (DetectiveRequest)
```json
{
  "paragraph_id": "string",
  "user_guess": "string",
  "target_keywords": [
    "string"
  ]
}
```

### Response Payload (DetectiveResponse)
```json
{
  "match_percentage": 75,
  "hint": "You're close! Think about what time of day the scene takes place.",
  "keywords_found": [
    "forest",
    "lantern",
    "shadows"
  ],
  "keywords_missed": [
    "midnight"
  ]
}
```

### Next.js Fetch Example
```javascript
const evaluateDetective = async (payload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/detective/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) throw new Error("Backend validation or LLM failure");
  return await response.json(); // Returns DetectiveResponse schema
};
```

---

## 3. Health Check
**Endpoint:** `GET /health`

### Response Payload
```json
{
  "status": "ok",
  "message": "Spark School API is running"
}
```

---

## 4. Error Handling
- **Status 422 (Unprocessable Entity):** Triggered when request payloads fail Pydantic validation (e.g. missing required fields or invalid data types).
- **Status 500 (Internal Server Error):** Triggered when Gemini API encounters a generation or evaluation error.

### Error Response Schema
```json
{
  "status_code": 500,
  "message": "Error description here",
  "details": null
}
```

---

## 5. TypeScript Interfaces
You can copy and paste these TypeScript interfaces directly into your Next.js project (e.g., `types/api.ts`):

```typescript
export interface ChallengeRequest {
  challenge_id: string;
  user_prompt: string;
  constraints: string[];
}

export interface ChallengeResponse {
  score: number;
  feedback: string;
  constraints_met: string[];
  constraints_missed: string[];
}

export interface DetectiveRequest {
  paragraph_id: string;
  user_guess: string;
  target_keywords: string[];
}

export interface DetectiveResponse {
  match_percentage: number;
  hint: string;
  keywords_found: string[];
  keywords_missed: string[];
}

export interface ErrorResponse {
  status_code: number;
  message: string;
  details?: unknown;
}
```
