"use client"

import { useContext, useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./Navbar.css"

const Navbar = () => {
  const { currentUser, userType, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo">
            <Link to="/" className="logo-text">
              <span className="logo-icon">V</span>olunteerConnect
            </Link>
          </div>
          <div className="navbar-links desktop-only">
            <Link to="/" className={`nav-link ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${isActive("/about")}`}>
              About
            </Link>
            <Link to="/services" className={`nav-link ${isActive("/services")}`}>
              Services
            </Link>
            <Link to="/contact" className={`nav-link ${isActive("/contact")}`}>
              Contact
            </Link>
          </div>
        </div>
        <div className="navbar-right desktop-only">
          {currentUser ? (
            <>
              {userType === "organization" && (
                <Link to="/chatbot" className={`nav-link ${isActive("/chatbot")}`}>
                  <i className="icon-chat"></i> Chatbot
                </Link>
              )}
              {userType === "volunteer" && (
                <Link to="/volunteer/dashboard" className={`nav-link ${isActive("/volunteer/dashboard")}`}>
                  <i className="icon-dashboard"></i> Dashboard
                </Link>
              )}
              {userType === "organization" && (
                <Link to="/organization/requests" className={`nav-link ${isActive("/organization/requests")}`}>
                  <i className="icon-requests"></i> Requests
                </Link>
              )}
              <div className="user-menu">
                <span className="user-name">{currentUser.name}</span>
                <button onClick={handleLogout} className="btn btn-primary">
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <div className="mobile-menu-toggle">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="menu-button">
            <span className={`menu-icon ${mobileMenuOpen ? "open" : ""}`}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            <Link to="/" className={`mobile-nav-link ${isActive("/")}`} onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link
              to="/about"
              className={`mobile-nav-link ${isActive("/about")}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`mobile-nav-link ${isActive("/services")}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className={`mobile-nav-link ${isActive("/contact")}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="mobile-auth-links">
            {currentUser ? (
              <>
                {userType === "organization" && (
                  <Link to="/chatbot" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                    <i className="icon-chat"></i> Chatbot
                  </Link>
                )}
                {userType === "volunteer" && (
                  <Link to="/volunteer/dashboard" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                    <i className="icon-dashboard"></i> Dashboard
                  </Link>
                )}
                {userType === "organization" && (
                  <Link
                    to="/organization/requests"
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="icon-requests"></i> Requests
                  </Link>
                )}
                <button onClick={handleLogout} className="btn btn-primary mobile-btn">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary mobile-btn" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
