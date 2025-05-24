// src/pages/PreferencePage.jsx
import React, { useEffect, useState } from 'react';
import Preference from '../PrefenceTest page/Preference';
import { motion } from 'framer-motion';
import './PreferencePage.css';

export default function PreferencePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    setError('');
    fetch('https://207.127.93.193/api/preference-tests', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch questions');
        return res.json();
      })
      .then(data => {
        setItems(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Could not load questions. Please try again later.');
        setLoading(false);
      });
  }, [isLoggedIn]);

  return (
    <div className="preference-page">
      <motion.div
        className="preference-intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Discover Your Career Path</h1>
        <div className="intro-content">
          <div className="intro-section">
            <h2>Why Take This Test?</h2>
            <p>
              This preference test is designed to help you understand your natural inclinations and interests
              in different work environments and activities. By identifying what truly excites and motivates you,
              we can guide you toward career paths that align with your personality and preferences.
            </p>
          </div>

          <div className="intro-section">
            <h2>How It Works</h2>
            <p>
              You'll be presented with various work-related scenarios and activities. For each one, rate how much
              you enjoy or would enjoy engaging in that activity. Be honest with your responses - there are no
              right or wrong answers. Your genuine preferences will help us create a personalized career roadmap.
            </p>
          </div>

          <div className="intro-section">
            <h2>What You'll Gain</h2>
            <ul>
              <li>Insights into your work style preferences</li>
              <li>Understanding of your natural strengths</li>
              <li>Personalized career path recommendations</li>
              <li>Clear direction for your professional development</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {isLoggedIn ? (
          loading ? (
            <div style={{ textAlign: 'center', margin: '2rem', fontSize: '1.2rem' }}>Loading questions...</div>
          ) : error ? (
            <div style={{ color: 'salmon', textAlign: 'center', margin: '2rem' }}>{error}</div>
          ) : (
            <Preference items={items} />
          )
        ) : (
          <div style={{ textAlign: 'center', margin: '2.5rem 0 3rem 0' }}>
            <div style={{ fontSize: '1.25rem', color: 'var(--color-gray-200)', marginBottom: '2.5rem' }}>
              <strong>Want to discover your best-fit career path?</strong>
              <br />
              <span style={{ display: 'inline-block', marginTop: '1.1rem' }}>
                Log in or create an account to take the full Preference Test and get personalized results!
              </span>
            </div>
            <a href="/login" className="btn-primary" style={{ fontSize: '1.1rem', padding: '0.9rem 2.5rem', borderRadius: '1.2rem', textDecoration: 'none' }}>Log In</a>
            <span style={{ margin: '0 1rem', color: 'var(--color-gray-400)' }}>or</span>
            <a href="/register" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '0.9rem 2.5rem', borderRadius: '1.2rem', textDecoration: 'none' }}>Create Account</a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
