import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./CSS/home.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hi! I'm your Career & Job Market Assistant. Ask me anything about jobs, skills, or careers!",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Ref to store the chat session so it persists across renders
  const chatSessionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Initialize Gemini SDK
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  useEffect(() => {
    // Initialize Chat Session with system instruction
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "You are a helpful, encouraging Career Counselor and Job Market Expert. Keep answers concise, actionable, and formatted nicely."
    });
    
    chatSessionRef.current = model.startChat({
      history: [], // Start with empty history
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Autosize textarea
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 240) + "px";
    }
  }, [input]);

  const addMessage = (role, text) => {
    setMessages((prev) => [
      ...prev,
      { role, text, time: new Date().toLocaleTimeString() },
    ]);
  };

  const sendMessage = async (evt) => {
    if (evt) evt.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // 1. Add user message to UI
    addMessage("user", trimmed);
    setInput("");
    setLoading(true);

    try {
        if (!chatSessionRef.current) {
            throw new Error("Chat session not initialized");
        }

        // 2. Send message to Gemini (Client-side)
        const result = await chatSessionRef.current.sendMessage(trimmed);
        const response = await result.response;
        const botText = response.text();

        // 3. Add bot response to UI
        addMessage("bot", botText);

    } catch (error) {
      console.error("Error with Gemini API:", error);
      addMessage("bot", "⚠️ Connectivity issue. Please check your internet or API Key.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    // Reset UI
    setMessages([
      {
        role: "bot",
        text: "👋 Hi! I'm your Career & Job Market Assistant. Ask me anything about jobs, skills, or careers!",
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setInput("");

    // Reset Gemini History
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    chatSessionRef.current = model.startChat({ history: [] });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{ paddingBottom: "2rem" }}>
        <div className="hero-content">
          <div className="hero-text" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <h1 className="hero-title">
              Career <span className="gradient-text">Chatbot</span>
            </h1>
            <p className="hero-subtitle">
              Get instant, AI-powered answers to all your career questions.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="features" style={{ paddingTop: "2rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              background: "var(--dark-card)",
              border: "1px solid var(--dark-border)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                padding: "1rem 1.25rem",
                borderBottom: "1px solid var(--dark-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
                💼 Career & Job Market ChatBot
              </h3>
              <button className="btn btn-ghost" onClick={clearChat} style={{background: 'rgba(0,0,0,0.2)', border:'none', color:'white', padding:'4px 12px', borderRadius:'4px', cursor:'pointer'}}>
                Clear
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                height: "540px",
                overflowY: "auto",
                padding: "1rem",
                background: "var(--dark-bg)",
              }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    marginBottom: "1rem",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Bot Icon */}
                  {msg.role === "bot" && (
                    <div style={{
                      width: 40, height: 40, background: "var(--primary)",
                      borderRadius: "50%", display: "flex", alignItems: "center",
                      justifyContent: "center", marginRight: "0.75rem", flexShrink: 0
                    }}>🤖</div>
                  )}

                  {/* Message Bubble */}
                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "0.85rem 1rem",
                      borderRadius: 12,
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                        : "var(--dark-card)",
                      border: msg.role === "bot" ? "1px solid var(--dark-border)" : "none",
                      color: "var(--text-primary)",
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <div style={{ fontSize: "0.95rem" }}>{msg.text}</div>
                    <div style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: 6 }}>
                      {msg.time}
                    </div>
                  </div>

                  {/* User Icon */}
                  {msg.role === "user" && (
                    <div style={{
                      width: 40, height: 40, background: "var(--dark-border)",
                      borderRadius: "50%", display: "flex", alignItems: "center",
                      justifyContent: "center", marginLeft: "0.75rem", flexShrink: 0
                    }}>👤</div>
                  )}
                </div>
              ))}

              {loading && (
                <div style={{ color: "var(--text-secondary)", fontSize: "0.95rem", fontStyle: "italic", marginLeft: '3.5rem' }}>
                  Thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={sendMessage}
              style={{
                padding: "1rem",
                borderTop: "1px solid var(--dark-border)",
                background: "var(--dark-card)",
              }}
            >
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e);
                    }
                  }}
                  placeholder="Ask about jobs, skills, or careers..."
                  rows={1}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: "var(--dark-bg)",
                    border: "1px solid var(--dark-border)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    resize: "none",
                    minHeight: 38,
                    maxHeight: 240,
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="btn btn-primary"
                  style={{ padding: "0.65rem 1rem", minWidth: 100 }}
                >
                  {loading ? "..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatBot;