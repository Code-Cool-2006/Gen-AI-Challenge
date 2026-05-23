import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    closeMenu();
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-text">Career</span>
          <span className="logo-text gradient">AI</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className="nav-right">
          <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/resume-builder" className="nav-links" onClick={closeMenu}>
                Resume Builder
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/resume-analyze" className="nav-links" onClick={closeMenu}>
                Resume Analyzer
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mock-interview" className="nav-links" onClick={closeMenu}>
                Mock Interview
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/career-roadmap" className="nav-links" onClick={closeMenu}>
                Career Roadmap
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/job-market" className="nav-links" onClick={closeMenu}>
                Job Market
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chatbot" className="nav-links" onClick={closeMenu}>
                AI Assistant
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-links" onClick={closeMenu}>
                Contact
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <button className="nav-links logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
