from fastapi import APIRouter
from api.v1 import projects, documents, requirements

api_router = APIRouter()
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
from api.v1 import exports
api_router.include_router(requirements.router, prefix="/requirements", tags=["requirements"])
api_router.include_router(exports.router, prefix="/projects", tags=["exports"])
