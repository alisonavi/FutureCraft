// src/pages/PreferencePage.jsx
import React from 'react';
import Preference from '../PrefenceTest page/Preference';
import { motion } from 'framer-motion';
import './PreferencePage.css';

const testItems = [
  { id: '1', question: 'Working with computers and technology' },
  { id: '2', question: 'Helping people with their health or well-being' },
  { id: '3', question: 'Teaching or mentoring others' },
  { id: '4', question: 'Designing graphics or digital art' },
  { id: '5', question: 'Analyzing business data and trends' },
  { id: '6', question: 'Conducting scientific experiments' },
  { id: '7', question: 'Organizing community or social events' },
  { id: '8', question: 'Building software or apps' },
  { id: '9', question: 'Caring for patients or supporting mental health' },
  { id: '10', question: 'Solving math or coding problems' },
  { id: '11', question: 'Working in a team environment' },
  { id: '12', question: 'Leading projects or people' },
  { id: '13', question: 'Working outdoors or with nature' },
  { id: '14', question: 'Writing or creating content' },
  { id: '15', question: 'Managing finances or budgets' },
];

export default function PreferencePage() {
  const handleComplete = async (results) => {
    // results is an array of { itemId, choice, time }
    console.log(results);
    await fetch('/api/save-preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: 'diploma123', responses: results })
    });
    alert('Thank you! Your answers have been recorded.');
  };

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
        <Preference items={testItems} onComplete={handleComplete} />
      </motion.div>
    </div>
  );
}
