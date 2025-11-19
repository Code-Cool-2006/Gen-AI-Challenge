# TODO: Fix Backend Errors

## Steps to Complete
- [x] Update backend/main.py to use relative imports for routers (e.g., from .routers import auth)
- [x] Fix backend/routers/interview_routes.py: Add missing imports (BaseModel, List, InterviewSession, gemini_service), remove faulty logger line
- [x] Update backend/routers/career_path_routes.py to use relative imports (e.g., from ..models import User)
- [x] Update backend/routers/user.py to use relative imports (e.g., from ..database import get_db)
- [x] Check and update other router files (auth.py, profile_routes.py, chatbot.py, job_market.py, review_resume.py) for consistent relative imports
- [x] Force backend to use SQLite by hardcoding DATABASE_URL in database.py
- [x] Test the server by running uvicorn backend.main:app to ensure no import errors
- [ ] Update backend/models.py: Add missing columns to InterviewSession (job_title, experience_level, current_question, status)
- [ ] Update backend/routers/interview_routes.py: Fix attribute accesses (current_user.id to current_user.user_id, InterviewSession.id to session_id, handle session_id as int)
