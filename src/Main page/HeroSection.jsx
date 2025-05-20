import React from 'react';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <header className="hero-container fade-in fade-in-1">
      <div className="hero-content">
        <h2 className="fade-in fade-in-2">Your journey towards a fulfilling career begins here.</h2>
        <h1 className="fade-in fade-in-3">Welcome to FutureCraft</h1>
        <p className="fade-in fade-in-4">Discover the paths that align with your passions and skills.</p>
        <button className="cta-button fade-in fade-in-5" onClick={handleContactClick}>Contact Us</button>
      </div>
    </header>
  );
};

export default HeroSection;