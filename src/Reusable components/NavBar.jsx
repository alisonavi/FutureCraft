import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/FutureCraftLogo.png';
const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 0.01;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <div className="navbar-header">
          <div className="logo-container" onClick={() => { navigate('/') }}>
            <img alt="FutureCraft logo" src={logo} className="logo-img" />
            <h1 className="logo-text">FutureCraft</h1>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/preftest">Preference Test</Link>
            <Link to="/explore">Explore Paths</Link>
            <Link to="/register">Registration</Link>
            <Link to="#contact">Contact</Link>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;