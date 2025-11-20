import React from "react";
import "./CSS/home.css";

function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              About <span className="gradient-text">CareerAI</span>
            </h1>
            <p className="hero-subtitle">
              We're on a mission to transform careers using the power of artificial intelligence. 
              Our platform empowers professionals to build better resumes, prepare for interviews, 
              and make data-driven career decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="features">
        <div className="section-header">
          <h2>Our Mission</h2>
          <p>Empowering careers through AI-driven innovation</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <h3>Innovation First</h3>
            <p>
              We leverage cutting-edge AI technology to provide intelligent career 
              guidance and personalized recommendations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>User-Centric</h3>
            <p>
              Every feature is designed with our users in mind, ensuring an 
              intuitive and effective career development experience.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3>Results Driven</h3>
            <p>
              Our platform has helped thousands of professionals land their dream 
              jobs and advance their careers successfully.
            </p>
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>Our Core Values</h2>
          <p>The principles that guide everything we do</p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Excellence</h3>
            <p>
              We strive for excellence in every aspect of our platform, from AI
              accuracy to user experience.
            </p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">02</div>
            <h3>Integrity</h3>
            <p>
              We operate with transparency and honesty, building trust with our
              users through reliable service.
            </p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">03</div>
            <h3>Impact</h3>
            <p>
              We measure our success by the positive impact we make on our users'
              career journeys and lives.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="testimonials">
        <div className="section-header">
          <h2>Meet Our Team</h2>
          <p>The passionate Students Developers of CareerAI</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-author">
              <div className="author-avatar">OM</div>
              <div>
                <div className="author-name">Om Barge</div>
                <div className="author-role">Backend</div>
              </div>
            </div>
            <p>
              Visionary leader with tech, innovation. Passionate about democratizing career development through technology.
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-author">
              <div className="author-avatar">RC</div>
              <div>
                <div className="author-name">Rishab Chavadar</div>
                <div className="author-role">Frontend Developer</div>
              </div>
            </div>
            <p>
               Frontend developer in React JS and UI/UX enthusiast. Dedicated to creating seamless user experiences. 
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-author">
              <div className="author-avatar">SS</div>
              <div>
                <div className="author-name">Saanvi P Shetty</div>
                <div className="author-role">Frontend Designer</div>
              </div>
            </div>
            <p>
              Great at designing user-friendly interfaces. Passionate about enhancing user engagement through intuitive design.
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-author">
              <div className="author-avatar">RK</div>
              <div>
                <div className="author-name">Rishabh Kinnal</div>
                <div className="author-role">Backend & AI Implementer</div>
              </div>
            </div>
            <p>
              Backend developer with a knack for AI integration. Focused on building robust systems that power intelligent career solutions.
            </p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-author">
              <div className="author-avatar">HD</div>
              <div>
                <div className="author-name">Hrishikash Desai</div>
                <div className="author-role">Data Scrapper</div>
              </div>
            </div>
            <p>
              Skilled in data extraction and processing. Ensures our platform has accurate and up-to-date information for users.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="features">
        <div className="section-header">
          <h2>Our Impact</h2>
          <p>Making a difference in careers worldwide</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>50K+ Users Worldwide</h3>
            <p>
              Professionals trust CareerAI for their career development and growth.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3>95% Success Rate</h3>
            <p>
              Of our users report improved interview performance and career outcomes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>24/7 AI Support</h3>
            <p>
              Always available to help you with career guidance and professional development.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
