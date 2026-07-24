# 🚀 BidReady AI
### Automated RFP & Tender Compliance Platform

> **Turn complex RFPs into evidence-backed, submission-ready response plans.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-AWS%20Elastic%20Beanstalk-orange?style=flat-square&logo=amazon-aws)](http://bidready-frontend-live-env.eba-9gdin3qg.us-east-1.elasticbeanstalk.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20+%20pgvector-336791?style=flat-square&logo=postgresql)](https://github.com/pgvector/pgvector)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini%202.0%20Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)

---

## 📖 Overview

**BidReady AI** is a full-stack, AI-powered proposal intelligence platform that helps IT agencies, cloud consultancies, and startup teams respond to Requests for Proposal (RFPs) with speed, accuracy, and verifiable compliance.

Instead of manually reading 50-page PDFs and writing proposals from scratch, teams upload their RFP and receive:

- ✅ An **AI-extracted compliance matrix** — every requirement categorised, prioritised, and risk-scored
- ✅ **Evidence-grounded draft responses** — cited answers backed only by uploaded company documents
- ✅ **Real-time streaming AI output** — drafts appear word-by-word via Server-Sent Events (SSE)
- ✅ **Exportable deliverables** — compliance matrix as CSV and full proposal draft as Markdown

🌐 **Live Application:** http://bidready-frontend-live-env.eba-9gdin3qg.us-east-1.elasticbeanstalk.com/

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              Next.js 14 Frontend (Port 3000)                 │
│          TypeScript · TailwindCSS · shadcn/ui                │
│       AWS Elastic Beanstalk (Production)                     │
└─────────────────────┬───────────────────────────────────────┘
                      │  REST APIs + SSE Streams
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              FastAPI Backend (Port 8000)                      │
│  ├── /api/v1/projects      → Project CRUD                    │
│  ├── /api/v1/documents     → Upload, Ingest, Search          │
│  ├── /api/v1/requirements  → Compliance Matrix + SSE Stream  │
│  └── /api/v1/projects/{id}/export → CSV + Markdown Export    │
└──────┬──────────────────┬──────────────────┬────────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌────────────┐  ┌──────────────────┐  ┌─────────────────────┐
│ PostgreSQL │  │   Amazon S3      │  │  Google Gemini      │
│ 16+pgvector│  │  (Doc Storage)   │  │  2.0 Flash API      │
│            │  │                  │  │                     │
│ Projects   │  │  projects/       │  │  · Requirement      │
│ Documents  │  │  {project_id}/   │  │    Extraction       │
│ Chunks     │  │  {filename}      │  │  · SSE Streaming    │
│ Requirements│ │                  │  │    Draft Generation │
└────────────┘  └──────────────────┘  └─────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14, TypeScript | App Router, SSE client, responsive UI |
| **UI** | TailwindCSS, shadcn/ui | Dark-mode design system |
| **Backend** | Python 3.11, FastAPI, Uvicorn | REST API + Server-Sent Events streaming |
| **AI / LLM** | Google Gemini 2.0 Flash (`google-genai`) | Requirement extraction + draft generation |
| **PDF Processing** | pypdf, PyMuPDF (`fitz`) | Text extraction with dual-library fallback |
| **Text Chunking** | LangChain Text Splitters | Recursive 1000-char chunking for RAG |
| **Database** | PostgreSQL 16 + `pgvector` | Relational data + cosine-distance vector search |
| **ORM** | SQLAlchemy 2.x, Alembic | Models + schema migrations |
| **Cloud Storage** | Amazon S3 (boto3) | Secure document storage |
| **Containerization** | Docker, Docker Compose | Local dev + production packaging |
| **Deployment** | AWS Elastic Beanstalk | Public HTTPS production hosting |
| **Testing** | Pytest, httpx | Backend API integration tests |
| **Validation** | Pydantic v2 | Request/response schema enforcement |

---

## ⚡ Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js v18+](https://nodejs.org/)
- A `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/) *(optional — smart fallback parser works without it)*

### 1. Clone the Repository
```bash
git clone https://github.com/Vanillaaz/BidReadyAI.git
cd BidReadyAI
```

### 2. Configure Environment Variables
```bash
cp backend/.env.example backend/.env
# Add your GEMINI_API_KEY to backend/.env
```

### 3. Start Database & Backend Services
```bash
docker-compose up -d db backend
```
The FastAPI backend and interactive API docs will be live at:
- API: `http://localhost:8000/api/v1/health`
- Swagger UI: `http://localhost:8000/docs`

### 4. Start Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 📡 API Endpoints Reference

Base URL: `/api/v1`

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | `/health` | Health check — confirms backend is running |
| `POST` | `/projects/` | Create a new RFP project workspace |
| `GET` | `/projects/` | List all active project workspaces |
| `GET` | `/projects/{id}` | Get a single project's details |
| `GET` | `/projects/{id}/requirements` | List & filter extracted requirements by category / priority |
| `GET` | `/projects/{id}/export` | Export full proposal draft as Markdown |
| `GET` | `/projects/{id}/export/csv` | Export compliance matrix as CSV |
| `POST` | `/documents/upload` | Upload & ingest RFP PDF into pgvector |
| `POST` | `/documents/{id}/search` | Semantic search within a document |
| `GET` | `/requirements/{id}` | Get a single requirement |
| `GET` | `/requirements/{id}/draft/stream` | **SSE** — live-stream AI draft response word-by-word |
| `PUT` | `/requirements/{id}/draft` | Save finalized proposal draft text |

---

## 🤖 AI & Prompting Strategy

BidReady AI uses **Google Gemini 2.0 Flash** via the `google-genai` SDK for two core AI functions:

### 1 — Requirement Extraction
Gemini receives the raw RFP text (capped at 8,000 chars) and returns a structured JSON array of 5–8 requirements, each with:
`title · description · category · priority · gap_status · owner · risk_level · confidence_score · source_page`

### 2 — Evidence-Grounded Draft Streaming
Gemini receives the requirement text + up to 3 relevant document chunks retrieved from pgvector, then streams a cited draft response word-by-word via SSE. The model is explicitly constrained to:
- Use **only** supplied evidence — no invented claims
- Include inline citations: `[Source: Document Name, p. X]`
- State `"Insufficient evidence available"` when support is missing

**Fallback:** A deterministic NLP keyword parser activates automatically when no API key is present, ensuring the app always produces output.

---

## 🗄️ Database Schema

```
projects          → id, name, client_name, deadline, status, compliance_score
documents         → id, project_id, name, s3_key, processing_status
document_chunks   → id, document_id, page_number, content, embedding Vector(1536)
requirements      → id, project_id, category, title, description, priority,
                    gap_status, owner, confidence_score, risk_level,
                    evidence_citations, draft_content, source_page, status
```

---

## 🧪 Testing

Run the automated backend test suite:
```bash
docker-compose exec backend pytest tests/test_api.py -v
```

---

## 🚀 Deployment

The frontend is deployed on **AWS Elastic Beanstalk**:

🌐 http://bidready-frontend-live-env.eba-9gdin3qg.us-east-1.elasticbeanstalk.com/

### Local Docker Build
```bash
# Build and run all services
docker-compose up --build

# Backend only
docker-compose up -d db backend
```

---

## 📁 Project Structure

```
BidReadyAI/
├── docker-compose.yml
├── README.md
├── frontend/                     # Next.js 14 App
│   ├── Dockerfile
│   └── src/app/
│       ├── page.tsx              # Landing page
│       ├── dashboard/            # Project list & compliance scores
│       ├── upload/               # Document upload flow
│       ├── requirements/         # Compliance matrix view
│       ├── chat/                 # AI chat interface
│       └── login/                # Authentication
└── backend/                      # FastAPI Application
    ├── Dockerfile
    ├── main.py                   # App entry point + CORS
    ├── requirements.txt
    ├── api/v1/
    │   ├── projects.py           # Project CRUD
    │   ├── documents.py          # Upload, ingestion, search
    │   ├── requirements.py       # Compliance matrix + SSE stream
    │   └── exports.py            # CSV + Markdown export
    ├── services/
    │   ├── gemini_service.py     # Gemini 2.0 Flash integration
    │   ├── ingestion_service.py  # PDF → LangChain chunking
    │   └── rag_service.py        # pgvector cosine search
    ├── db/
    │   ├── models.py             # SQLAlchemy ORM models
    │   └── database.py           # DB connection + init
    └── tests/
        └── test_api.py           # Pytest API tests
```

---

## 🔐 Security Notes

- All secrets are stored in `.env` files — **never committed to Git**
- AWS credentials use IAM roles; no keys are hardcoded
- S3 bucket is private; documents are not publicly accessible
- The Gemini API key is server-side only — never exposed to the browser
- `.gitignore` excludes all `.env` files, logs, build artifacts, and deployment zips

---

*IBM Internship Capstone Project · July 2026*
