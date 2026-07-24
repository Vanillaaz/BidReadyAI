import pytest
from fastapi.testclient import TestClient
from main import app
from db.database import Base, engine, get_db
from sqlalchemy.orm import sessionmaker

# Setup a test database
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_create_project():
    response = client.post("/api/v1/projects/", json={
        "name": "Test RFP Workspace",
        "client_name": "Department of Transportation"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test RFP Workspace"
    assert "id" in data
    return data["id"]

def test_get_projects():
    response = client.get("/api/v1/projects/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_gemini_fallback_extractor():
    from services.gemini_service import extract_requirements_with_gemini
    sample_text = (
        "Section 3.1 Security Requirement: The vendor must maintain ISO 27001 compliance and AES-256 encryption. "
        "Section 4.2 Technical Requirement: The provider shall guarantee 99.9% uptime SLA."
    )
    reqs = extract_requirements_with_gemini(sample_text)
    assert len(reqs) > 0
    assert "title" in reqs[0]
    assert "category" in reqs[0]

def test_stream_draft_endpoint():
    response = client.get("/api/v1/requirements/test-req-123/draft/stream")
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/event-stream")
    assert "data:" in response.text

def test_export_project_markdown():
    project_id = test_create_project()
    response = client.get(f"/api/v1/projects/{project_id}/export")
    assert response.status_code == 200
    assert "Project Export" in response.text

def test_export_project_csv():
    project_id = test_create_project()
    response = client.get(f"/api/v1/projects/{project_id}/export/csv")
    assert response.status_code == 200
    assert "Requirement ID" in response.text

