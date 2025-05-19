// src/pages/PreferencePage.jsx
import React from 'react';
import Preference from '../PrefenceTest page/Preference';

const testItems = [
  { id: '1', left: '/imgs/a1.jpg', right: '/imgs/b1.jpg' },
  { id: '2', left: '/imgs/a2.jpg', right: '/imgs/b2.jpg' },
  // …more pairs
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
    <div>
      <h1>Which design do you prefer?</h1>
      <Preference items={testItems} onComplete={handleComplete} />
    </div>
  );
}
