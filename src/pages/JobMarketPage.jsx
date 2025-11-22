import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { FaSearch } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./CSS/home.css";

const JobMarketPage = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize SDK
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleGetInsights = async () => {
    if (!jobTitle) {
      setError("Please enter a job title.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setInsights(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        Analyze the current job market for the role: "${jobTitle}".
        Provide the output as a strictly formatted JSON object (no markdown, no code blocks).
        The JSON must have this exact structure:
        {
          "averageSalary": "String (e.g. $80k - $120k or ₹6 LPA - ₹12 LPA)",
          "demand": "String (e.g. High, Very High, Moderate)",
          "topSkills": [
            { "name": "Skill Name", "importance": Integer (0 to 100) },
            { "name": "Skill Name", "importance": Integer (0 to 100) },
            { "name": "Skill Name", "importance": Integer (0 to 100) },
            { "name": "Skill Name", "importance": Integer (0 to 100) },
            { "name": "Skill Name", "importance": Integer (0 to 100) }
          ]
        }
        Provide 5 to 8 top skills.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Clean up if AI adds markdown code blocks
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();

      const parsedData = JSON.parse(text);

      // Sort skills by importance for better visualization
      if (parsedData.topSkills) {
        parsedData.topSkills = parsedData.topSkills.sort(
          (a, b) => b.importance - a.importance
        );
      }

      setInsights(parsedData);
    } catch (err) {
      console.error("AI Generation failed:", err);
      setError("Failed to fetch market insights. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const barColors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe",
    "#00c49f", "#ffbb28", "#d0ed57", "#a4de6c", "#f06292",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{ paddingBottom: '2rem' }}>
        <div className="hero-content">
          <div className="hero-text" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="hero-title">
              Job Market <span className="gradient-text">Insights</span>
            </h1>
            <p className="hero-subtitle">
              Get real-time AI-analyzed data on salary trends, demand, and skills.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="features" style={{ paddingTop: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: 'var(--dark-card)',
            border: '1px solid var(--dark-border)',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', textAlign: 'center' }}>
              📊 Analyze Job Market Data
            </h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Enter a job title to generate live market data using AI.
            </p>

            {/* Input + Button */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter Job Title (e.g., React Developer)"
                style={{
                  flex: 1,
                  maxWidth: '500px',
                  padding: '0.875rem 1rem',
                  background: 'var(--dark-bg)',
                  border: '1px solid var(--dark-border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
              <button
                onClick={handleGetInsights}
                disabled={isLoading}
                className="btn btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem'
                }}
              >
                <FaSearch />
                {isLoading ? "Analyzing..." : "Get Insights"}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem' }}>
                {error}
              </p>
            )}

            {/* Insights Display */}
            {insights && (
              <div style={{ marginTop: '2rem', animation: 'fadeIn 0.6s ease' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1.5rem', 
                  marginBottom: '2rem' 
                }}>
                  {/* Salary Card */}
                  <div style={{
                    background: 'rgba(99, 102, 241, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid var(--primary)',
                    textAlign: 'center'
                  }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      Estimated Salary Range
                    </h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>
                      {insights.averageSalary}
                    </p>
                  </div>

                  {/* Demand Card */}
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #10b981',
                    textAlign: 'center'
                  }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      Market Demand
                    </h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                      {insights.demand}
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div style={{
                  background: 'var(--dark-bg)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--dark-border)'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '1.5rem' }}>
                    Top Skills by Importance
                  </h3>
                  <div style={{ width: '100%', height: insights.topSkills.length * 60 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={insights.topSkills}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        barCategoryGap={20}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--dark-border)" />
                        <XAxis type="number" domain={[0, 100]} stroke="var(--text-secondary)" />
                        <YAxis
                          type="category"
                          dataKey="name"
                          width={150}
                          tick={{ fontSize: 14, fill: 'var(--text-primary)' }}
                        />
                        <Tooltip 
                          cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                          contentStyle={{
                            background: 'var(--dark-card)',
                            border: '1px solid var(--dark-border)',
                            color: 'var(--text-primary)'
                          }}
                        />
                        <Bar dataKey="importance" barSize={20} radius={[0, 5, 5, 0]}>
                          {insights.topSkills.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default JobMarketPage;