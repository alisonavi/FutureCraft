import React from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/FutureCraftLogo.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
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