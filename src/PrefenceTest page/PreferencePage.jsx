// src/pages/PreferencePage.jsx
import React from 'react';
import Preference from '../PrefenceTest page/Preference';
import img1 from '../assets/goofy1.jpg'
import img2 from '../assets/goofy2.jpg'
import img3 from '../assets/goofy3.jpg'
import img4 from '../assets/goofy4.jpg'
const testItems = [
  { id: '1', left: img1, right: img2 },
  { id: '2', left: img3, right: img4 },
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
      <h1>Which design do you prefer?</h1>
      <Preference items={testItems} onComplete={handleComplete} />
    </div>
  );
}
