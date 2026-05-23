import React, { useEffect, useMemo, useRef, useState } from "react";

/* ─── Design tokens ─────────────────────────────────────────────── */
const T = {
  paper:   "#F5F0E8",
  ink:     "#1A1410",
  mid:     "#6B5E52",
  faint:   "#D6CFC4",
  accent:  "#C8401A",
  accentL: "#E8866A",
  blue:    "#1E3A5F",
  blueL:   "#4A7BAF",
  gold:    "#B8860B",
  white:   "#FDFAF5",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .cr-root {
    min-height: 100vh;
    background: ${T.paper};
    color: ${T.ink};
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  /* Subtle dot-grid background */
  .cr-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: radial-gradient(circle, ${T.faint} 1px, transparent 1px);
    background-size: 28px 28px;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  .cr-inner {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    padding: clamp(2rem, 6vw, 5rem) clamp(1.25rem, 5vw, 2.5rem);
  }

  /* ── Header ── */
  .cr-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${T.accent};
    margin-bottom: 1.25rem;
  }
  .cr-eyebrow::before {
    content: '';
    display: block;
    width: 28px;
    height: 1.5px;
    background: ${T.accent};
  }

  .cr-headline {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    font-size: clamp(2.6rem, 7vw, 5rem);
    line-height: 1.05;
    color: ${T.ink};
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }
  .cr-headline em {
    font-style: italic;
    color: ${T.accent};
  }

  .cr-subhead {
    font-size: clamp(0.95rem, 2.2vw, 1.1rem);
    color: ${T.mid};
    line-height: 1.75;
    max-width: 560px;
    margin-bottom: 2.5rem;
    font-weight: 300;
  }

  /* ── Divider rule ── */
  .cr-rule {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, ${T.ink}, ${T.faint} 80%, transparent);
    margin: 2rem 0;
  }

  /* ── Input area ── */
  .cr-form {
    display: flex;
    gap: 0.75rem;
    align-items: stretch;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .cr-input-wrap {
    flex: 1 1 260px;
    position: relative;
  }
  .cr-input-wrap svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${T.mid};
    width: 16px;
    height: 16px;
    pointer-events: none;
  }
  .cr-input {
    width: 100%;
    padding: 0.85rem 1rem 0.85rem 2.75rem;
    background: ${T.white};
    border: 1.5px solid ${T.faint};
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: ${T.ink};
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .cr-input::placeholder { color: ${T.mid}; opacity: 0.6; }
  .cr-input:focus {
    border-color: ${T.blue};
    box-shadow: 0 0 0 3px rgba(30,58,95,0.08);
  }

  .cr-btn {
    padding: 0.85rem 1.75rem;
    background: ${T.ink};
    color: ${T.paper};
    border: none;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .cr-btn:hover { background: ${T.blue}; transform: translateY(-1px); }
  .cr-btn:active { transform: translateY(0); }
  .cr-btn:disabled { background: ${T.mid}; cursor: not-allowed; transform: none; }

  /* ── Results panel ── */
  .cr-results {
    background: ${T.white};
    border: 1.5px solid ${T.faint};
    border-radius: 10px;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;
    opacity: 0;
    max-height: 0;
  }
  .cr-results.open {
    opacity: 1;
    max-height: 3000px;
  }

  .cr-results-header {
    background: ${T.ink};
    color: ${T.paper};
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .cr-results-header .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${T.accentL};
    animation: blink 1.2s ease-in-out infinite;
  }

  @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.2; } }

  .cr-results-body {
    padding: clamp(1.25rem, 4vw, 2rem) clamp(1.25rem, 4vw, 2rem);
  }

  /* ── Formatted output ── */
  .cr-prose h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    font-weight: 700;
    color: ${T.blue};
    margin: 1.75rem 0 0.6rem;
    padding-bottom: 0.4rem;
    border-bottom: 1.5px solid ${T.faint};
  }
  .cr-prose h3:first-child { margin-top: 0; }
  .cr-prose p {
    font-size: 0.95rem;
    line-height: 1.8;
    color: ${T.mid};
    margin-bottom: 0.75rem;
  }
  .cr-prose ul {
    list-style: none;
    padding: 0;
    margin-bottom: 0.75rem;
  }
  .cr-prose li {
    font-size: 0.93rem;
    line-height: 1.75;
    color: ${T.ink};
    padding: 0.4rem 0 0.4rem 1.4rem;
    position: relative;
    border-bottom: 1px solid ${T.faint};
  }
  .cr-prose li:last-child { border-bottom: none; }
  .cr-prose li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: ${T.accent};
    font-weight: 500;
  }
  .cr-prose strong { color: ${T.ink}; font-weight: 500; }
  .cr-prose em { color: ${T.gold}; font-style: italic; }
  .cr-prose br { display: block; margin: 0.25rem 0; content: ''; }

  /* ── Loading ── */
  .cr-loading {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 1.5rem 0;
    color: ${T.mid};
    font-size: 0.9rem;
    font-weight: 300;
    letter-spacing: 0.03em;
  }
  .cr-spinner {
    width: 22px; height: 22px;
    border: 2px solid ${T.faint};
    border-top-color: ${T.blue};
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Footer note ── */
  .cr-footer {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    color: ${T.mid};
    letter-spacing: 0.05em;
    font-family: 'DM Mono', monospace;
  }
  .cr-footer::before {
    content: '';
    flex: 1;
    height: 1px;
    background: ${T.faint};
  }

  @media (max-width: 520px) {
    .cr-btn { width: 100%; justify-content: center; }
    .cr-input-wrap { flex-basis: 100%; }
  }
`;

/* ─── Markdown → HTML (same logic, new classes) ──────────────────── */
function formatResponse(text) {
  const lines = (text || "").split("\n");
  const parts = [];
  let inList = false;

  const closeList = () => { if (inList) { parts.push("</ul>"); inList = false; } };
  const inline = (s) =>
    s.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
     .replace(/\*(.*?)\*/g, "<em>$1</em>");

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^#{1,6}\s+/.test(line)) {
      closeList();
      parts.push(`<h3>${inline(line.replace(/^#{1,6}\s+/, ""))}</h3>`);
      continue;
    }
    const li = line.match(/^[-*]\s+(.*)$/);
    if (li) {
      if (!inList) { inList = true; parts.push("<ul>"); }
      parts.push(`<li>${inline(li[1])}</li>`);
      continue;
    }
    if (line.trim() === "") { closeList(); parts.push("<br>"); continue; }
    closeList();
    parts.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  return parts.join("");
}

/* ─── API call ───────────────────────────────────────────────────── */
async function callGemini(jobTitle, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const system = `You are a helpful and encouraging career advisor. Provide clear, structured, motivating career guidance. Format using markdown headings.`;
  const user = `Provide a career path analysis for: "${jobTitle}". Include:\n1. **🚀 A Potential Career Path:** Entry role + 3–5 advancement steps.\n2. **🔧 Key Skills to Master:** 5–7 crucial technical and soft skills.\n3. **🤔 Sample Interview Questions:** 3 insightful questions — one behavioral, one technical, one situational.`;

  for (let i = 0; i < 3; i++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: user }] }],
        systemInstruction: { parts: [{ text: system }] },
      }),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) return text;
    if (i < 2) await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
  }
  throw new Error("No response from API");
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function CareerRoadmap() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [htmlOutput, setHtmlOutput] = useState("");
  const [open, setOpen] = useState(false);
  const resultsRef = useRef(null);

  const onSubmit = async () => {
    const val = jobTitle.trim();
    if (!val) {
      setHtmlOutput("<p>Please enter a job title to begin.</p>");
      setOpen(true);
      return;
    }
    setLoading(true);
    setHtmlOutput("");
    setOpen(true);

    try {
      const raw = await callGemini(val, apiKey);
      setHtmlOutput(formatResponse(raw));
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      setHtmlOutput("<p>Could not connect to the AI. Please try again.</p>");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="cr-root">
        <div className="cr-inner">

          {/* Eyebrow */}
          <div className="cr-eyebrow">AI Career Pathfinder</div>

          {/* Headline */}
          <h1 className="cr-headline">
            Every career is a<br />
            story <em>waiting</em> to unfold.
          </h1>

          <p className="cr-subhead">
            Enter your job title and our AI advisor will chart a personalised
            path — from where you are to where you want to be.
          </p>

          <div className="cr-rule" />

          {/* Form */}
          <div className="cr-form">
            <div className="cr-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="cr-input"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && onSubmit()}
                type="text"
                placeholder="e.g. Product Manager, Data Scientist…"
              />
            </div>
            <button className="cr-btn" onClick={onSubmit} disabled={loading}>
              {loading ? (
                <>
                  <span className="cr-spinner" />
                  Charting…
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                  Chart My Path
                </>
              )}
            </button>
          </div>

          {/* Results */}
          <div ref={resultsRef} className={`cr-results${open ? " open" : ""}`}>
            <div className="cr-results-header">
              {loading && <span className="dot" />}
              {loading ? "Gemini is charting your course…" : `Analysis — ${jobTitle || "—"}`}
            </div>
            <div className="cr-results-body">
              {loading && (
                <div className="cr-loading">
                  <span className="cr-spinner" />
                  Thinking through your career trajectory…
                </div>
              )}
              <div
                className="cr-prose"
                dangerouslySetInnerHTML={{ __html: htmlOutput }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="cr-footer">Powered by Gemini 2.5 Flash</div>

        </div>
      </div>
    </>
  );
}
