import React, { useState } from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/FutureCraftLogo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <Link to="/register" onClick={handleNavLinkClick}>Registration</Link>
            <Link to="/contact" onClick={handleNavLinkClick}>Contact</Link>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;