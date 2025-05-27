import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast/ToastContext';
import './Explore.css';

const ExplorePaths = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const containerRef = useRef(null);

  const fetchPaths = async () => {
    try {
      const response = await fetch('/api/paths');
      const data = await response.json();
      setPaths(data);
    } catch (error) {
      showToast('Failed to load paths', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPaths();
  }, []);

  const handleTouchStart = (e) => {
    if (containerRef.current.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (containerRef.current.scrollTop === 0) {
      const touchY = e.touches[0].clientY;
      const pull = touchY - touchStartY.current;

      if (pull > 0) {
        setPullDistance(pull);
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 100) {
      setRefreshing(true);
      fetchPaths();
    }
    setPullDistance(0);
  };

  return (
    <div
      ref={containerRef}
      className="explore-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {refreshing && (
        <div className="pull-indicator">
          <div className="loading-spinner" />
          <span style={{ marginLeft: '0.5rem' }}>Refreshing...</span>
        </div>
      )}

      <div
      >
        <h1>Explore Career Paths</h1>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading paths...</p>
          </div>
        ) : (
          <div className="paths-grid">
            {paths.map((path) => (
              <div
                className="path-card"
              >
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <div className="path-stats">
                  <span>{path.duration} months</span>
                  <span>{path.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePaths; 