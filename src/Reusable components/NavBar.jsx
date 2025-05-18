import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

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
      <div className="navbar-header">
        <h1 className="logo" onClick={() => {
          navigate('/')
        }}>FutureCraft</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="#test">Preference Test</Link>
          <Link to="#paths">Explore Paths</Link>
          <Link to="/register">Registration</Link>
          <Link to="#contact">Contact</Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;