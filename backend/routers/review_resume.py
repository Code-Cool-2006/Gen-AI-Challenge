from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os

# --- Configure Gemini ---
genai.configure(api_key=os.getenv("VITE_GEMINI_API_KEY"))

class ResumeRequest(BaseModel):
    resumeText: str
    collegeTier: str | None = "Tier 2/3"
    characterProfileKey: str | None = "Not specified"
    skills: list[str] | None = []

# Character profiles
character_profiles = {
    "Explorer": {"name": "The Explorer"},
    "Captain": {"name": "The Captain"},
    "Connector": {"name": "The Connector"},
    "Challenger": {"name": "The Challenger"},
    "DeepDiver": {"name": "The Deep Diver"},
}

router = APIRouter(
    prefix="/api/resume",
    tags=["Resume Review"]
)


@router.post("/review")
async def review_resume(data: ResumeRequest):

    system_instruction = """You are an expert career coach and recruiter specializing in 
    helping students from Tier 2/3 colleges land jobs at top companies.
    Provide clear, impactful, ATS-friendly resume feedback in markdown format."""

    prompt = f"""
Please review the following resume for a student from a {data.collegeTier} college.

Character Profile: "{character_profiles.get(data.characterProfileKey, {}).get('name', 'Not specified')}"
Target Skills: {', '.join(data.skills) if data.skills else "Not specified"}

Resume:
---
{data.resumeText}
---

Follow this structure:

### Overall Impression
(brief summary)

### ATS Compatibility Score (Rate out of 10)
(explain keywords, clarity, formatting)

### Actionable Feedback
- Bullet point
- Bullet point
- Bullet point
"""

    try:
        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            system_instruction=system_instruction
        )

        response = model.generate_content(prompt)

        return {"feedback": response.text}

    except Exception as e:
        print("Error:", e)
        return {"error": "Could not generate feedback."}
