import React from 'react';
import './Footer.css';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <p className="footer-logo">FutureCraft</p>
          <p className="footer-desc">
            FutureCraft empowers you to discover, explore, and pursue your ideal career path with personalized insights and interactive tools.
          </p>
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <nav className="footer-nav">
            <a href="/" className="footer-link">Home</a>
            <a href="/explore" className="footer-link">Explore</a>
            <a href="/preftest" className="footer-link">Preference Test</a>
            <a href="/contact" className="footer-link">Contact</a>
          </nav>
        </div>
        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>Email: <a href="mailto:support@futurecraft.com" className="footer-link">support@futurecraft.com</a></p>
          <div className="footer-socials">
            <a href="https://twitter.com/" className="footer-social" title="Twitter" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com/" className="footer-social" title="Instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com/" className="footer-social" title="LinkedIn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>©2025 FutureCraft. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;