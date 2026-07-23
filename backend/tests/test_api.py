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

def test_create_project():
    response = client.post("/api/v1/projects/", json={
        "name": "Test Project",
        "description": "A test RFP"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Project"
    assert "id" in data
    return data["id"]

def test_get_projects():
    response = client.get("/api/v1/projects/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_export_project_not_found():
    response = client.get("/api/v1/projects/invalid-id/export")
    assert response.status_code == 404
