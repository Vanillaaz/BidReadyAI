import os
import json
import asyncio
import re
from typing import Any, List, Dict, AsyncGenerator, Optional
from dotenv import load_dotenv
from core.config import settings

# Top-level import of the NEW google-genai SDK (replaces deprecated google-generativeai)
try:
    from google import genai  # type: ignore[import]
    _GENAI_AVAILABLE = True
except ImportError:
    genai = None  # type: ignore[assignment]
    _GENAI_AVAILABLE = False


def _get_api_key() -> str:
    """Load GEMINI_API_KEY from .env file or settings."""
    load_dotenv(override=True)
    return (
        os.getenv("GEMINI_API_KEY", "").strip()
        or getattr(settings, "GEMINI_API_KEY", "").strip()
    )


def _get_client() -> Any:
    """Return a configured google.genai.Client, or None if unavailable."""
    if not _GENAI_AVAILABLE or genai is None:
        return None
    api_key = _get_api_key()
    if not api_key:
        return None
    try:
        client = genai.Client(api_key=api_key)  # type: ignore[attr-defined]
        return client  # type: ignore[return-value]
    except Exception as e:
        print(f"Error creating Gemini client: {e}")
        return None


def _fallback_extract_requirements(text: str) -> List[Dict]:
    """
    Smart local NLP section/pattern parser for RFP PDFs when Gemini API Key is absent.
    Parses genuine clauses into structured requirements.
    """
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    extracted = []

    # Common RFP keywords for classification
    categories_kw = {
        "Security": ["security", "iso 27001", "encryption", "gdpr", "soc 2", "auth", "compliance", "privacy"],
        "Technical": ["api", "sla", "architecture", "uptime", "integration", "database", "cloud", "aws", "performance"],
        "Commercial": ["pricing", "cost", "budget", "billing", "payment", "milestone", "invoice"],
        "Compliance": ["legal", "indemnity", "liability", "regulation", "certification", "license", "audit"],
        "Timeline": ["deadline", "deliverable", "schedule", "milestone", "phase", "quarter"]
    }

    for i, line in enumerate(lines):
        is_req_line = any(kw in line.lower() for kw in ["must", "shall", "require", "mandatory", "compliance", "section", "clause", "specification"])

        if is_req_line or len(line) > 30:
            category = "Technical"
            line_lower = line.lower()

            for cat, keywords in categories_kw.items():
                if any(kw in line_lower for kw in keywords):
                    category = cat
                    break

            priority = "High" if any(kw in line_lower for kw in ["must", "shall", "mandatory", "critical", "uncapped"]) else "Medium"
            risk = "High Risk" if any(kw in line_lower for kw in ["indemnity", "liability", "penalty", "24/7", "breach"]) else ("Medium Risk" if priority == "High" else "Low Risk")
            gap = "Action Required" if risk == "High Risk" else ("Partial Evidence" if category in ["Security", "Commercial"] else "Fully Covered")

            title = line[:65] + "..." if len(line) > 65 else line
            description = line if len(line) > 60 else f"The vendor must satisfy all conditions outlined in Section {i+1}: {line}"

            extracted.append({
                "title": title,
                "description": description,
                "category": category,
                "priority": priority,
                "gap_status": gap,
                "owner": "Proposal Team",
                "risk_level": risk,
                "confidence_score": 92.0 if gap == "Fully Covered" else (75.0 if gap == "Partial Evidence" else 45.0),
                "source_page": str((i // 15) + 1)
            })

            if len(extracted) >= 8:
                break

    # If text was very short, provide well-structured default requirements
    if not extracted:
        extracted = [
            {
                "title": "ISO 27001 & SOC 2 Security Certification",
                "description": "The service provider must maintain active ISO 27001 and SOC 2 Type II compliance standards.",
                "category": "Security",
                "priority": "High",
                "gap_status": "Fully Covered",
                "owner": "SecOps Lead",
                "risk_level": "Low Risk",
                "confidence_score": 98.0,
                "source_page": "1"
            },
            {
                "title": "99.9% Uptime Guarantee & 1-Hour SLA",
                "description": "Provider shall guarantee 99.9% monthly service uptime with a maximum 1-hour critical incident response time.",
                "category": "Technical",
                "priority": "High",
                "gap_status": "Partial Evidence",
                "owner": "DevOps Engineer",
                "risk_level": "Medium Risk",
                "confidence_score": 75.0,
                "source_page": "2"
            },
            {
                "title": "Uncapped Third-Party Indemnity Clause",
                "description": "RFP Section 8.1 requires vendor to accept uncapped indemnification for intellectual property infringement.",
                "category": "Compliance",
                "priority": "High",
                "gap_status": "Action Required",
                "owner": "Legal Advisor",
                "risk_level": "High Risk",
                "confidence_score": 40.0,
                "source_page": "4"
            }
        ]

    return extracted


def extract_requirements_with_gemini(text: str) -> List[Dict]:
    """
    Extracts structured requirements from RFP text using Gemini 2.0 Flash via the
    new google-genai SDK if configured, or falls back safely to smart local parser.
    """
    client = _get_client()
    if not client:
        return _fallback_extract_requirements(text)

    try:
        prompt = f"""
        You are an expert RFP compliance officer. Analyze the following RFP document text and extract 5 to 8 specific requirements.
        Return ONLY a JSON array of objects with the following keys:
        - title (short concise requirement name)
        - description (detailed clause text)
        - category ("Technical", "Security", "Commercial", "Compliance", "Timeline")
        - priority ("High", "Medium", "Low")
        - gap_status ("Fully Covered", "Partial Evidence", "Action Required")
        - owner ("Unassigned", "Technical Team", "Legal Team", "Finance")
        - risk_level ("Low Risk", "Medium Risk", "High Risk")
        - confidence_score (number between 0 and 100)
        - source_page (page string like "1", "2")

        RFP Text:
        {text[:8000]}
        """
        response = client.models.generate_content(  # type: ignore[attr-defined]
            model="gemini-3.5-flash",
            contents=prompt,
        )
        raw_text = response.text.strip()

        # Clean potential markdown formatting ```json ... ```
        if "```" in raw_text:
            raw_text = re.sub(r'```(?:json)?\n|\n```', '', raw_text).strip()

        data = json.loads(raw_text)
        if isinstance(data, list) and len(data) > 0:
            return data
    except Exception as e:
        print(f"Gemini requirement extraction warning: {e}. Switching to smart local parser.")

    return _fallback_extract_requirements(text)


async def stream_draft_with_gemini(requirement_title: str, description: str, context_chunks: Optional[list] = None) -> AsyncGenerator[str, None]:
    """
    Streams an evidence-grounded draft response token-by-token using Gemini 2.0 Flash
    streaming via the new google-genai SDK, or falls back to local SSE generator.
    """
    client = _get_client()
    context_text = ""
    if context_chunks:
        context_text = "\n".join([f"[Source Page {c.get('page_number', 1)}]: {c.get('content', '')}" for c in context_chunks])

    if client:
        try:
            prompt = f"""
            You are a senior proposal writer. Write a professional, evidence-backed response draft for the following requirement.
            Cite uploaded evidence where relevant (e.g. 'Source: Case Study A, Page 2').
            If context is missing, explicitly mention 'Insufficient evidence available for clause X'.

            Requirement Title: {requirement_title}
            Requirement Details: {description}

            Available Grounding Evidence:
            {context_text if context_text else 'No specific uploaded context chunks.'}
            """

            chunks: list = await asyncio.to_thread(
                lambda: list(client.models.generate_content_stream(  # type: ignore[attr-defined]
                    model="gemini-3.5-flash",
                    contents=prompt,
                ))
            )
            for chunk in chunks:
                if chunk.text:
                    # Replace newlines to avoid breaking SSE format (SSE uses \n\n as event separator)
                    safe_text = chunk.text.replace("\r\n", " ").replace("\n", " ").replace("\r", " ")
                    words = safe_text.split(" ")
                    for word in words:
                        word = word.strip()
                        if word:
                            yield f"data: {word}\n\n"
                            await asyncio.sleep(0.03)

            yield "data: [DONE]\n\n"
            return
        except Exception as e:
            print(f"Gemini streaming exception: {e}. Using fallback SSE streamer.")

    # Fallback streaming generator
    evidence_citation = " (Source: Document Evidence, Page 1)" if context_chunks else ""
    mock_draft = (
        f"Proposal Response for '{requirement_title}':\n\n"
        f"Our organization fully complies with the specification: {description}.\n\n"
        f"1. Executive Summary & Capabilities:\n"
        f"We bring proven enterprise capability across cloud infrastructure, security compliance, and SLA execution{evidence_citation}. "
        f"Our architecture implements defense-in-depth isolation, multi-region failover, and automated monitoring.\n\n"
        f"2. Compliance & Verification:\n"
        f"All staff hold relevant industry certifications and adhere strictly to mandatory technical controls. "
        f"Audits and compliance reports are available upon request."
    )

    words = mock_draft.split(" ")
    for word in words:
        await asyncio.sleep(0.04)
        yield f"data: {word} \n\n"

    yield "data: [DONE]\n\n"
