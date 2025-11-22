import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import MockInterview from './pages/MockInterview';
import JobMatching from './pages/JobMatching';
import SkillJobMatching from './pages/SkillJobMatching';
import ChatBot from './pages/ChatBot';
import CareerRoadmap from './pages/CareerRoadmap';
import JobMarketPage from './pages/JobMarketPage';
import ResumePage from './pages/ResumePage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/resume-analyze" element={<ResumeAnalyzer />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/job-matching" element={<JobMatching />} />
            <Route path="/skill-job-matching" element={<SkillJobMatching />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/career-roadmap" element={<CareerRoadmap />} />
            <Route path="/job-market" element={<JobMarketPage />} />
            <Route path="/resume-builder" element={<ResumePage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
