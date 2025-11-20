# Career AI

## Description
A comprehensive AI-powered career guidance platform that helps users navigate their professional journey through personalized roadmaps, AI chatbot assistance, mock interviews, resume analysis, and job market insights.

## Features
- **Career Roadmap**: Personalized career path planning
- **AI Chatbot**: Intelligent career advice and guidance
- **Mock Interviews**: Practice interviews with feedback
- **Resume Analyzer**: AI-powered resume review and suggestions
- **Job Market Insights**: Real-time job market data and trends
- **User Profiles**: Manage personal career information
- **Google Authentication**: Secure login with Google OAuth

## Tech Stack
### Frontend
- React 18
- Vite
- Material-UI (MUI)
- React Router
- Axios for API calls
- Firebase for authentication

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- SQLite database
- Google OAuth2 for authentication

### Additional Server
- Express.js (Node.js) for Google auth handling

## Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn
- pip

## Installation

### Frontend Setup
1. Navigate to the root directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The frontend will run on http://localhost:5173

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Set up environment variables (create .env file):
   - DATABASE_URL=sqlite:///./career_ai.db
   - GOOGLE_CLIENT_ID=your_google_client_id
   - JWT_SECRET=your_jwt_secret
4. Run the FastAPI server:
   ```
   uvicorn main:app --reload
   ```
   The backend will run on http://localhost:8000

### Express Server Setup (for Google Auth)
1. Navigate to the server directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables (create .env file):
   - GOOGLE_CLIENT_ID=your_google_client_id
   - JWT_SECRET=your_jwt_secret
   - PORT=5000
4. Start the server:
   ```
   node server.js
   ```
   The server will run on http://localhost:5000

## Usage
1. Start all servers (frontend, backend, express server)
2. Open http://localhost:5173 in your browser
3. Sign in with Google
4. Explore features: Career Roadmap, Chatbot, Mock Interviews, etc.

## API Endpoints
- GET / - Health check
- POST /auth/google - Google authentication
- /users/ - User management
- /profiles/ - User profiles
- /career-paths/ - Career path planning
- /interviews/ - Mock interviews
- /job-market/ - Job market data
- /resume-review/ - Resume analysis
- /chatbot/ - AI chatbot interactions

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
This project is licensed under the MIT License.
