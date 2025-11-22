import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import "./CSS/home.css";

const SkillJobMatching = () => {
  const [skills, setSkills] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!skills.trim()) {
      setError("Please enter your skills.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch("/api/skill-job-matching/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: skills.split(",").map(skill => skill.trim()).filter(skill => skill),
          collegeTier: "Tier 2/3",
          characterProfileKey: "Explorer"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err.message || "Failed to analyze skills. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container my-5 bg-dark text-white">
      <h1 className="fw-bold mb-3 text-white">Skill-Based Job Matching</h1>
      <p className="text-light mb-4">
        Enter your current skills and get personalized job suggestions based on your expertise.
      </p>

      <div className="row g-4">
        {/* Skills Input */}
        <div className="col-md-6">
          <div className="card bg-secondary text-white shadow-sm">
            <div className="card-body">
              <label className="form-label fw-bold">Your Skills</label>
              <textarea
                className="form-control mb-3 bg-dark text-white border-light"
                rows="8"
                placeholder="Enter your skills separated by commas (e.g., Python, JavaScript, React, SQL, Machine Learning, Data Analysis)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <small className="text-muted mb-3 d-block">
                Separate multiple skills with commas. Include technical skills, soft skills, tools, and frameworks.
              </small>
              {error && <p className="text-danger small">{error}</p>}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="btn btn-primary w-100 fw-bold"
              >
                {isAnalyzing ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Finding Jobs...
                  </>
                ) : (
                  "🔍 Find Matching Jobs"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="col-md-6">
          <div className="card bg-secondary text-white shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold mb-3 text-white">Job Suggestions</h4>
              {isAnalyzing && (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
              {analysis && (
                <div className="space-y-4">
                  {/* Skills Analysis */}
                  <div className="mb-4">
                    <h5 className="text-primary">Skills Analysis</h5>
                    <div className="bg-dark p-3 rounded">
                      <p><strong>Identified Skills:</strong> {analysis.skillAnalysis?.identifiedSkills?.join(", ") || "N/A"}</p>
                      <p><strong>Skill Level:</strong> {analysis.skillAnalysis?.skillLevel || "N/A"}</p>
                      <p><strong>Top Industries:</strong> {analysis.skillAnalysis?.topIndustries?.join(", ") || "N/A"}</p>
                      <p><strong>Career Level:</strong> {analysis.skillAnalysis?.careerLevel || "N/A"}</p>
                    </div>
                  </div>

                  {/* Suggested Jobs */}
                  <div className="mb-4">
                    <h5 className="text-primary">Suggested Jobs</h5>
                    {analysis.suggestedJobs?.map((job, index) => (
                      <div key={index} className="bg-dark p-3 rounded mb-3">
                        <h6 className="text-primary">{job.title} at {job.company}</h6>
                        <p className="mb-1"><strong>Match Score:</strong> {job.matchScore}/100</p>
                        <p className="mb-1"><strong>Salary:</strong> {job.salaryRange}</p>
                        <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                        <p className="mb-2">{job.description}</p>
                        <p className="mb-1"><strong>Matching Skills:</strong> {job.matchingSkills?.join(", ")}</p>
                        <p className="mb-1"><strong>Skills to Learn:</strong> {job.skillsToLearn?.join(", ")}</p>
                        <p className="text-muted small"><strong>Why Match:</strong> {job.whyMatch}</p>
                      </div>
                    ))}
                  </div>

                  {/* Career Paths */}
                  <div>
                    <h5 className="text-primary">Career Paths</h5>
                    {analysis.careerPaths?.map((path, index) => (
                      <div key={index} className="bg-dark p-3 rounded mb-3">
                        <h6 className="text-primary">{path.careerField}</h6>
                        <p><strong>Entry:</strong> {path.entryLevel}</p>
                        <p><strong>Mid:</strong> {path.midLevel}</p>
                        <p><strong>Senior:</strong> {path.seniorLevel}</p>
                        <p><strong>Skills:</strong> {path.requiredSkills?.join(", ")}</p>
                        <p><strong>Salary Progression:</strong> {path.salaryProgression}</p>
                        <p><strong>Growth:</strong> {path.growthPotential}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!isAnalyzing && !analysis && (
                <p className="text-light">Your job matching results will appear here.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillJobMatching;
