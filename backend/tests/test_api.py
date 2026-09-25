from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "message": "Spark School API is running"
    }


def test_challenge_validation_error():
    response = client.post("/api/v1/challenge/evaluate", json={})
    assert response.status_code == 422


def test_detective_validation_error():
    response = client.post("/api/v1/detective/evaluate", json={})
    assert response.status_code == 422
