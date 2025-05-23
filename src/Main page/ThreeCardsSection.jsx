import React from 'react';
import './ThreeCardsSection.css';
import designImg from '../assets/three1.png';
import graphImg from '../assets/three3.png';
import fbImg from '../assets/three1.jpg';
import { useNavigate } from 'react-router-dom';
import ChatBot from './ChatBot';

const ThreeCardsSection = () => {
  const navigate = useNavigate();

  const handlePreferenceTest = () => {
    navigate('/preftest');
  };

  const handleCareerRecommendations = () => {
    navigate('/explore');
  };

  const handleStartJourney = () => {
    navigate('/register');
  };

  const isLoggedIn = !!localStorage.getItem('access_token');

  const GamePreview = () => {
    return (
      <section className="game-preview-section card fade-in fade-in-7" style={{ margin: '3rem auto', maxWidth: 700, textAlign: 'center', background: 'var(--gradient-secondary)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>FutureCraft Game Arena</h2>
        <p style={{ color: 'var(--color-gray-200)', marginBottom: '1.5rem' }}>
          Experience your potential career paths in an immersive 3D environment. Compete, learn, and climb the leaderboard!
        </p>
        <img src="/game-preview.jpg" alt="Game Preview" style={{ width: '100%', borderRadius: '1rem', margin: '1.5rem 0', boxShadow: '0 4px 24px rgba(0,21,56,0.15)' }} />
        <button
          className="btn-primary"
          style={{ marginTop: '1.5rem', fontSize: '1.1rem', padding: '0.75rem 2.5rem' }}
          onClick={() => navigate(isLoggedIn ? '/game' : '/login')}
        >
          {isLoggedIn ? 'Play Now' : 'Log in to Play'}
        </button>
      </section>
    );
  };

  return (
    <>
      <section className="cards-section fade-in fade-in-1">
        <div className="section-header">
          <h2 className="fade-in fade-in-2">Take the First Step</h2>
          <p className="fade-in fade-in-3">Unlock your future today!</p>
        </div>
        <div className="cards-container">
          <div className="card fade-in fade-in-4">
            <img src={designImg} alt="Design blocks" className="fade-in fade-in-5" />
            <div className="card-content">
              <h3 className="fade-in fade-in-6">Why Take the Preference Test?</h3>
              <p className="fade-in fade-in-7">
                Our preference test is designed to help you understand your career inclinations better. By answering a few simple questions, you can gain valuable insights into which career paths may suit you best, guiding you toward a more fulfilling future.
              </p>
              <button className="fade-in fade-in-8" onClick={handlePreferenceTest}>Read More</button>
            </div>
          </div>
          <div className="card fade-in fade-in-5">
            <img src={graphImg} alt="Graph chart" className="fade-in fade-in-6" />
            <div className="card-content">
              <h3 className="fade-in fade-in-7">Personalized Career Recommendations</h3>
              <p className="fade-in fade-in-8">
                After completing the test, you'll receive tailored recommendations that align with your interests. This personalized approach ensures that your career exploration is directed and meaningful, making your journey smoother and more enjoyable.
              </p>
              <button className="fade-in fade-in-9" onClick={handleCareerRecommendations}>Read More</button>
            </div>
          </div>
          <div className="card fade-in fade-in-6">
            <img src={fbImg} alt="Facebook icon" className="fade-in fade-in-7" />
            <div className="card-content">
              <h3 className="fade-in fade-in-8">Start Your Journey Now</h3>
              <p className="fade-in fade-in-9">
                Don't wait any longer to explore the possibilities that await you. Taking the preference test is the first step toward a career that excites and inspires you. Click the button below to get started today!
              </p>
              <button className="fade-in fade-in-10" onClick={handleStartJourney}>Read More</button>
            </div>
          </div>
        </div>
      </section>
      <GamePreview />
      <ChatBot />
    </>
  );
};

export default ThreeCardsSection;