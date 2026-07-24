from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

import uuid

from db.database import get_db
from db import models
from schemas import project as schemas

router = APIRouter()

@router.post("/", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = models.Project(
        id=str(uuid.uuid4()),
        name=project.name,
        client_name=project.client_name,
        deadline=project.deadline
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/", response_model=List[schemas.ProjectResponse])
def list_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    return projects

@router.get("/{project_id}", response_model=schemas.ProjectResponse)
def get_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/{project_id}/requirements")
def list_project_requirements(
    project_id: str, 
    category: Optional[str] = None, 
    priority: Optional[str] = None, 
    db: Session = Depends(get_db)
):
    query = db.query(models.Requirement).filter(models.Requirement.project_id == project_id)
    if category:
        query = query.filter(models.Requirement.category == category)
    if priority:
        query = query.filter(models.Requirement.priority == priority)
    return query.all()
