import React, { useState } from 'react';
import './GameContainer.css';
import UnityGame from './UnityGame';

const GameContainer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="game-section">
      <div className="game-container">
        <div className="game-header">
          <h2>Interactive Career Explorer</h2>
          <p>Experience your potential career paths in an immersive 3D environment</p>
        </div>
        <div className="game-wrapper" style={{ position: 'relative' }}>
          {!isPlaying ? (
            <div className="game-overlay">
              <div className="game-preview">
                <div className="preview-content">
                  <h3>Ready to Explore?</h3>
                  <p>Click play to start your career exploration journey</p>
                  <button className="play-button" onClick={handlePlayClick}>
                    <span className="play-icon">▶</span>
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <UnityGame />
              <button
                className="fullscreen-button"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 10,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '1.2rem',
                  padding: '0.7rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(99,102,241,0.15)',
                  transition: 'background 0.2s',
                }}
                onClick={() => {
                  const btn = document.getElementById('unity-fullscreen-button');
                  if (btn) btn.click();
                }}
              >
                Fullscreen
              </button>
            </>
          )}
        </div>
        <div className="game-footer">
          <div className="game-controls">
            <div className="control-item">
              <span className="control-key">WASD</span>
              <span className="control-desc">Move</span>
            </div>
            <div className="control-item">
              <span className="control-key">Mouse</span>
              <span className="control-desc">Look Around</span>
            </div>
            <div className="control-item">
              <span className="control-key">E</span>
              <span className="control-desc">Interact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameContainer; 