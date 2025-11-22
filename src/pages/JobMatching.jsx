import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Direct SDK usage
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../styles/main.css';

export default function SkillJobMatching() {
  // 1. State Management
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [matchResult, setMatchResult] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. The AI Logic (Directly calls Gemini from Browser)
  const handleMatchRequest = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!jobDescription || !resumeText) {
      setError("Please provide both a Job Description and Resume text.");
      return;
    }

    setLoading(true);
    setError(null);
    setMatchResult("");

    try {
      // A. Initialize the API client
      // Make sure your .env file has VITE_GEMINI_API_KEY=your_key_here
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      
      // B. Select the correct model (CHANGED from 2.5 to 1.5-flash)
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // C. Construct the Prompt
      const prompt = `
        Act as an expert Applicant Tracking System (ATS) and Hiring Manager.
        
        I will provide a Job Description and a Resume.
        Analyze the match and provide the output in this strict format:
        
        1. **Match Score**: (Give a percentage, e.g., 75%)
        2. **Key Missing Skills**: List skills present in JD but missing in Resume.
        3. **Matching Strengths**: List skills that match well.
        4. **Actionable Advice**: 3 bullet points on how to tailor the resume for this specific job.

        JOB DESCRIPTION:
        ${jobDescription}

        RESUME:
        ${resumeText}
      `;

      // D. Generate Content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMatchResult(text);

    } catch (err) {
      console.error("AI Error:", err);
      setError("Failed to analyze. Check your API Key or Internet Connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="container my-5 grow">
        <h1 className="fw-bold mb-3 text-white">AI Job Matching</h1>
        <p className="text-light mb-4">
          Paste a job description and your resume to get a detailed compatibility
          analysis and actionable advice.
        </p>
        
        <div className="row g-4 grow">
          {/* Input Area */}
          <div className="col-md-6">
            <div className="card bg-secondary text-white shadow-sm h-100">
              <div className="card-body">
                <label className="form-label fw-bold">Job Description</label>
                <textarea
                  className="form-control mb-3 bg-dark text-white border-light"
                  rows="6"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                
                <label className="form-label fw-bold">Your Resume</label>
                <textarea
                  className="form-control mb-3 bg-dark text-white border-light"
                  rows="6"
                  placeholder="Paste your resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />

                {error && <div className="alert alert-danger">{error}</div>}
                
                <button
                  onClick={handleMatchRequest}
                  disabled={loading}
                  className="btn btn-primary w-100 fw-bold mt-2"
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Analyzing...
                    </span>
                  ) : "🔍 Analyze Match"}
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Display Area */}
          <div className="col-md-6">
            <div className="card bg-secondary text-white shadow-sm h-100">
              <div className="card-body">
                <h4 className="fw-bold mb-3 text-white border-bottom pb-2">Analysis Result</h4>
                
                {loading && (
                   <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-2">Consulting Gemini AI...</p>
                   </div>
                )}

                {!loading && matchResult && (
                  <div className="analysis-content p-3 bg-dark rounded border border-light" style={{whiteSpace: 'pre-wrap', lineHeight: '1.6'}}>
                    {matchResult}
                  </div>
                )}

                {!loading && !matchResult && (
                  <div className="text-center py-5 text-white-50">
                    <p>Results will appear here after analysis.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}