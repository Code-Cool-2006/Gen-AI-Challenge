import React, { useState } from "react";

export default function JobMatching() {
  const [skills, setSkills] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/skill-job-matching/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: skills.split(",").map(skill => skill.trim()).filter(skill => skill.length > 0),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze skills");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Find Jobs That Match Your Skills
      </h1>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        Enter your skills below and get personalized job recommendations based on your expertise and experience.
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="bg-card-background border border-secondary rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="skills" className="block text-sm font-medium mb-2">
                Your Skills (comma-separated)
              </label>
              <textarea
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., Python, JavaScript, React, SQL, Machine Learning, Data Analysis"
                className="w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  Analyzing Skills...
                </>
              ) : (
                "Find Matching Jobs"
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-md">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {results && (
          <div className="mt-8 space-y-8">
            {/* Skill Analysis */}
            <div className="bg-card-background border border-secondary rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">Skill Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Identified Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.skillAnalysis.identifiedSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Career Level</h3>
                  <p className="text-muted-foreground">{results.skillAnalysis.careerLevel}</p>
                  <h3 className="font-semibold mb-2 mt-4">Skill Level</h3>
                  <p className="text-muted-foreground">{results.skillAnalysis.skillLevel}</p>
                </div>
              </div>
            </div>

            {/* Job Suggestions */}
            <div className="bg-card-background border border-secondary rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">Job Suggestions</h2>
              <div className="space-y-4">
                {results.suggestedJobs.map((job, index) => (
                  <div key={index} className="border border-secondary rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
                        {job.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{job.company} • {job.location}</p>
                    <p className="text-sm mb-3">{job.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-1">Salary Range</h4>
                        <p className="text-muted-foreground">{job.salaryRange}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Matching Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {job.matchingSkills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-success/10 text-success rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Skills to Learn</h4>
                        <div className="flex flex-wrap gap-1">
                          {job.skillsToLearn.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-warning/10 text-warning rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Why This Match</h4>
                        <p className="text-muted-foreground text-xs">{job.whyMatch}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Paths */}
            <div className="bg-card-background border border-secondary rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">Career Paths</h2>
              <div className="space-y-4">
                {results.careerPaths.map((path, index) => (
                  <div key={index} className="border border-secondary rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{path.careerField}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-1">Entry Level</h4>
                        <p className="text-muted-foreground">{path.entryLevelPosition}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Mid Level</h4>
                        <p className="text-muted-foreground">{path.midLevelPosition}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Senior Level</h4>
                        <p className="text-muted-foreground">{path.seniorLevelPosition}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-1">Required Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {path.requiredSkills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-info/10 text-info rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
