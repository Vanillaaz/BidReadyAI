# 🚀 BidReady AI - Automated RFP & Tender Compliance Platform

BidReady AI is an end-to-end AI-powered proposal intelligence system designed for government contracting teams. It automates the extraction of compliance requirements from complex RFP (Request for Proposal) PDF documents, performs vector semantic retrieval via `pgvector`, streams AI proposal drafts in real-time, and exports finalized bid submissions.

---

## 🏗️ System Architecture

```
[ Next.js 14 Frontend ] (Port 3000)
       │
       │ (REST APIs & SSE Streams)
       ▼
[ FastAPI Backend ] (Port 8000)
       │
       ├──► [ PyMuPDF + LangChain ] (PDF Ingestion & Text Chunking)
       ├──► [ PostgreSQL + pgvector ] (Vector Search & Requirement Storage)
       └──► [ Amazon Bedrock / Claude 3 ] (AI Extraction & Streaming Drafts)
```

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (React, TypeScript, TailwindCSS)
- **Backend API**: Python 3.11, FastAPI, Uvicorn, Pytest
- **Database & Vectors**: PostgreSQL 16 with `pgvector` extension
- **PDF & RAG Pipeline**: PyMuPDF (`fitz`), LangChain Text Splitters, Boto3 (AWS Bedrock)
- **Containerization**: Docker & Docker Compose

---

## ⚡ Quick Start & Installation

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js v18+](https://nodejs.org/)

### 1. Clone the Repository
```bash
git clone https://github.com/Vanillaaz/BidReadyAI.git
cd BidReadyAI
```

### 2. Start Database & Backend Services
```bash
docker-compose up -d db backend
```
The FastAPI backend will be live at `http://localhost:8000/docs`.

### 3. Start Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/projects/` | Create a new RFP project workspace |
| `GET` | `/api/v1/projects/` | List all active project workspaces |
| `POST` | `/api/v1/documents/upload` | Upload & ingest RFP PDF document into `pgvector` |
| `GET` | `/api/v1/projects/{id}/requirements` | List & filter extracted requirements by category/priority |
| `GET` | `/api/v1/requirements/{id}/draft/stream` | Server-Sent Events (SSE) live streaming AI draft generator |
| `PUT` | `/api/v1/requirements/{id}/draft` | Save finalized proposal draft text |
| `GET` | `/api/v1/projects/{id}/export` | Export compiled Markdown response document |

---

## 🧪 Testing

To run the automated backend test suite:
```bash
docker-compose exec backend pytest tests/test_api.py
```
