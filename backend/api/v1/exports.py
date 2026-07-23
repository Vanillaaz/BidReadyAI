from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session
from db.database import get_db
import db.models as models

router = APIRouter()

@router.get("/{project_id}/export")
async def export_project_requirements(project_id: str, db: Session = Depends(get_db)):
    """
    Exports all requirements and their AI-generated drafts as a Markdown document.
    """
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    requirements = db.query(models.Requirement).filter(models.Requirement.project_id == project_id).all()
    
    # Generate Markdown
    md_content = f"# Project Export: {project.name}\n\n"
    
    if not requirements:
        md_content += "_No requirements found for this project._\n"
        
    for req in requirements:
        md_content += f"## {req.title or 'Untitled Requirement'}\n"
        md_content += f"**Category:** {req.category or 'N/A'} | **Priority:** {req.priority or 'N/A'}\n\n"
        md_content += f"### Original Description\n{req.description or 'No description provided.'}\n\n"
        md_content += f"### AI Draft Response\n{req.draft_content or 'No draft generated yet.'}\n\n"
        md_content += "---\n\n"
        
    return PlainTextResponse(md_content, media_type="text/markdown", headers={
        "Content-Disposition": f"attachment; filename=project_{project_id}_export.md"
    })
