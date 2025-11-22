from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from typing import List, Dict, Any

# Configure Gemini AI
genai.configure(api_key=os.getenv("VITE_GEMINI_API_KEY"))

class SkillJobMatchingRequest(BaseModel):
    skills: List[str]
    collegeTier: str | None = "Tier 2/3"
    characterProfileKey: str | None = "Explorer"

class JobSuggestion(BaseModel):
    title: str
    company: str
    matchScore: int
    salaryRange: str
    location: str
    description: str
    matchingSkills: List[str]
    skillsToLearn: List[str]
    whyMatch: str

class SkillJobMatchingResponse(BaseModel):
    skillAnalysis: Dict[str, Any]
    suggestedJobs: List[JobSuggestion]
    careerPaths: List[Dict[str, Any]]

router = APIRouter(
    prefix="/api/skill-job-matching",
    tags=["Skill Job Matching"]
)

@router.post("/analyze", response_model=SkillJobMatchingResponse)
async def analyze_skills_for_jobs(data: SkillJobMatchingRequest):
    try:
        # First, analyze the skills to determine proficiency and career level
        analysis_prompt = f"""
Analyze these skills and determine career level and industry focus:

Skills: {', '.join(data.skills)}

College Tier: {data.collegeTier}
Character Profile: {data.characterProfileKey}

Provide a JSON response with:
{{
  "identifiedSkills": ["skill1", "skill2", ...],
  "skillLevel": "beginner/intermediate/advanced",
  "topIndustries": ["industry1", "industry2", ...],
  "careerLevel": "entry/mid/senior level"
}}

Return ONLY valid JSON.
"""

        model = genai.GenerativeModel("gemini-2.0-flash")
        analysis_response = model.generate_content(analysis_prompt)
        analysis_text = analysis_response.text.strip()

        # Clean up JSON response
        if analysis_text.startswith("```json"):
            analysis_text = analysis_text[7:]
        if analysis_text.endswith("```"):
            analysis_text = analysis_text[:-3]

        import json
        skill_analysis = json.loads(analysis_text.strip())

        # Generate job suggestions based on skills
        job_suggestion_prompt = f"""
Based on these skills, suggest 5-7 relevant job opportunities:

Skills Analysis: {json.dumps(skill_analysis, indent=2)}

College Tier: {data.collegeTier}
Character Profile: {data.characterProfileKey}

For each job suggestion, provide:
- Job title
- Company name
- Match score (0-100)
- Salary range
- Location
- Brief description
- Matching skills (from user's skills that match this job)
- Skills to learn (additional skills needed for this job)
- Why this job matches the candidate

Format as JSON array of job objects.
Return ONLY valid JSON array.
"""

        job_response = model.generate_content(job_suggestion_prompt)
        job_text = job_response.text.strip()

        # Clean up JSON response
        if job_text.startswith("```json"):
            job_text = job_text[7:]
        if job_text.endswith("```"):
            job_text = job_text[:-3]

        suggested_jobs = json.loads(job_text.strip())

        # Generate career path suggestions
        career_prompt = f"""
Based on the skills analysis, suggest 3-4 career paths with progression:

Skills Analysis: {json.dumps(skill_analysis, indent=2)}

For each career path, provide:
- Career field
- Entry level position
- Mid level position
- Senior level position
- Required skills to advance
- Salary progression
- Growth potential

Format as JSON array.
Return ONLY valid JSON array.
"""

        career_response = model.generate_content(career_prompt)
        career_text = career_response.text.strip()

        if career_text.startswith("```json"):
            career_text = career_text[7:]
        if career_text.endswith("```"):
            career_text = career_text[:-3]

        career_paths = json.loads(career_text.strip())

        return SkillJobMatchingResponse(
            skillAnalysis=skill_analysis,
            suggestedJobs=suggested_jobs,
            careerPaths=career_paths
        )

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Skill job matching analysis failed: {str(e)}")
