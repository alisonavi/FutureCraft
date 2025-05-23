import React, { useState } from 'react';
import './GameContainer.css';
import UnityGame from './UnityGame';

const GameContainer = ({ previewOnly = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (previewOnly) return;
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
                  <button
                    className={`play-button${previewOnly ? ' disabled' : ''}`}
                    onClick={handlePlayClick}
                    disabled={previewOnly}
                    title={previewOnly ? 'Log in to play the game' : ''}
                    style={previewOnly ? { cursor: 'not-allowed', opacity: 0.6 } : {}}
                  >
                    <span className="play-icon">▶</span>
                    {previewOnly ? 'Log in to Play' : 'Play Now'}
                  </button>
                  {previewOnly && (
                    <div style={{ color: 'var(--color-accent)', marginTop: '1rem', fontWeight: 600 }}>
                      Please log in to play the game.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <UnityGame />
              <button
                className="fullscreen-button"
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