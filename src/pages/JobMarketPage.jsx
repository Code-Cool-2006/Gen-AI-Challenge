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

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0e27 0%, #0f1a3a 50%, #1a2847 100%)",
    color: "#ffffff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  // Hero
  hero: {
    paddingTop: "6rem",
    paddingBottom: "2rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: "1rem",
    color: "#ffffff",
  },
  gradientText: {
    background: "linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
    color: "#a0b0c0",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.8,
  },

  // Search Section
  section: {
    padding: "2rem 1.5rem 4rem",
  },
  card: {
    background: "#1a2847",
    border: "1px solid #2a3f5f",
    padding: "clamp(1.25rem, 4vw, 2rem)",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
    maxWidth: "900px",
    margin: "0 auto",
  },
  cardTitle: {
    fontSize: "clamp(1.4rem, 3vw, 2rem)",
    fontWeight: 700,
    marginBottom: "0.75rem",
    textAlign: "center",
    color: "#ffffff",
  },
  cardSubtitle: {
    textAlign: "center",
    color: "#a0b0c0",
    marginBottom: "2rem",
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
  },

  // Input row
  inputRow: {
    display: "flex",
    flexDirection: "row",
    gap: "0.75rem",
    justifyContent: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  input: {
    flex: "1 1 200px",
    maxWidth: "480px",
    minWidth: "0",
    padding: "0.875rem 1rem",
    background: "#0a0e27",
    border: "1px solid #2a3f5f",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.875rem 1.5rem",
    background: "linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)",
    color: "#0a0e27",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  // Error
  error: {
    color: "#ef4444",
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "0.95rem",
  },

  // Insights
  insightsWrapper: {
    marginTop: "2rem",
    animation: "fadeIn 0.6s ease",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.25rem",
    marginBottom: "2rem",
  },
  statCard: (borderColor, bgColor) => ({
    background: bgColor,
    padding: "1.5rem",
    borderRadius: "12px",
    border: `1px solid ${borderColor}`,
    textAlign: "center",
  }),
  statLabel: {
    fontSize: "0.9rem",
    color: "#a0b0c0",
    marginBottom: "0.5rem",
  },
  statValue: (color) => ({
    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
    fontWeight: 700,
    color: color,
    wordBreak: "break-word",
  }),

  // Chart container
  chartContainer: {
    background: "#0a0e27",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #2a3f5f",
    overflowX: "auto",
  },
  chartTitle: {
    fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#ffffff",
  },

  yAxisTick: {
    fontSize: 13,
    fill: "#a0b0c0",
  },
};

const BAR_COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe",
  "#00c49f", "#ffbb28", "#d0ed57", "#a4de6c", "#f06292",
];

const JobMarketPage = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedData = JSON.parse(text);

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

  const chartHeight = insights ? Math.max(insights.topSkills.length * 55, 200) : 200;

  // Responsive Y-axis width: estimate based on longest skill name
  const yAxisWidth = insights
    ? Math.min(
        Math.max(...insights.topSkills.map((s) => s.name.length)) * 7 + 10,
        160
      )
    : 120;

  return (
    <div style={styles.page}>
      {/* Keyframe injection */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        input::placeholder { color: #5a6a7a; }
        input:focus { border-color: #00d4ff !important; }
        @media (max-width: 480px) {
          .jm-input-row { flex-direction: column !important; }
          .jm-button { width: 100% !important; justify-content: center; }
        }
      `}</style>

      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Job Market <span style={styles.gradientText}>Insights</span>
        </h1>
        <p style={styles.heroSubtitle}>
          Get real-time AI-analyzed data on salary trends, demand, and skills.
        </p>
      </section>

      {/* Main Card */}
      <section style={styles.section}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>📊 Analyze Job Market Data</h2>
          <p style={styles.cardSubtitle}>
            Enter a job title to generate live market data using AI.
          </p>

          {/* Input Row */}
          <div
            className="jm-input-row"
            style={styles.inputRow}
          >
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleGetInsights()}
              placeholder="Enter Job Title (e.g., React Developer)"
              style={styles.input}
            />
            <button
              className="jm-button"
              onClick={handleGetInsights}
              disabled={isLoading}
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {}),
              }}
            >
              <FaSearch />
              {isLoading ? "Analyzing..." : "Get Insights"}
            </button>
          </div>

          {/* Error */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Results */}
          {insights && (
            <div style={styles.insightsWrapper}>
              {/* Stat Cards */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard("#6366f1", "rgba(99,102,241,0.08)")}>
                  <p style={styles.statLabel}>Estimated Salary Range</p>
                  <p style={styles.statValue("#ffffff")}>{insights.averageSalary}</p>
                </div>
                <div style={styles.statCard("#10b981", "rgba(16,185,129,0.08)")}>
                  <p style={styles.statLabel}>Market Demand</p>
                  <p style={styles.statValue("#10b981")}>{insights.demand}</p>
                </div>
              </div>

              {/* Chart */}
              <div style={styles.chartContainer}>
                <h3 style={styles.chartTitle}>Top Skills by Importance</h3>
                <div style={{ width: "100%", height: chartHeight, minWidth: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={insights.topSkills}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                      barCategoryGap={16}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a3f5f" />
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        stroke="#a0b0c0"
                        tick={{ fontSize: 12, fill: "#a0b0c0" }}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={yAxisWidth}
                        tick={{ fontSize: 13, fill: "#ffffff" }}
                        tickLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(99,102,241,0.1)" }}
                        contentStyle={{
                          background: "#1a2847",
                          border: "1px solid #2a3f5f",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "13px",
                        }}
                        formatter={(value) => [`${value}%`, "Importance"]}
                      />
                      <Bar dataKey="importance" barSize={18} radius={[0, 5, 5, 0]}>
                        {insights.topSkills.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={BAR_COLORS[index % BAR_COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobMarketPage; 
