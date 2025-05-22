import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/FutureCraftLogo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('access_token'));
    // Listen for login/logout events from other tabs and custom authchange event
    const handler = () => setIsLoggedIn(!!localStorage.getItem('access_token'));
    window.addEventListener('storage', handler);
    window.addEventListener('authchange', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('authchange', handler);
    };
  }, []);

  const handleHamburger = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav className={`navbar${mobileOpen ? ' mobile-open' : ''}`}>
      <div className="navbar-content">
        <div className="navbar-header">
          <div className="logo-container" onClick={() => { navigate('/') }}>
            <img alt="FutureCraft logo" src={logo} className="logo-img" />
            <h1 className="logo-text">FutureCraft</h1>
          </div>
          <button className="hamburger" onClick={handleHamburger} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
          <nav className="nav-links">
            <Link to="/" onClick={handleNavLinkClick}>Home</Link>
            <Link to="/preftest" onClick={handleNavLinkClick}>Preference Test</Link>
            <Link to="/explore" onClick={handleNavLinkClick}>Explore Paths</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={handleNavLinkClick}>Profile</Link>
              </>
            ) : (
              <>
                <Link to="/register" onClick={handleNavLinkClick}>Registration</Link>
                <Link to="/login" onClick={handleNavLinkClick}>Login</Link>
              </>
            )}
            <Link to="/contact" onClick={handleNavLinkClick}>Contact</Link>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;