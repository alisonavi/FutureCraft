// src/pages/PreferencePage.jsx
import React from 'react';
import Preference from '../PrefenceTest page/Preference';

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
    <div className="page-content">
      <h1>Career Path Personality Test</h1>
      <Preference items={testItems} onComplete={handleComplete} />
    </div>
  );
}
