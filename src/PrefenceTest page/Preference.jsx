// src/components/PreferenceTest.jsx
import React, { useState, useEffect } from 'react';
import './Preference.css';

// Utility to shuffle an array in place
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Preference({ items, onComplete }) {
  const [shuffled, setShuffled] = useState([]);
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [finished, setFinished] = useState(false);

  // Shuffle once when items first arrive
  useEffect(() => {
    setShuffled(shuffle([...items]));
  }, [items]);

  const current = shuffled[index];
  if (!current && !finished) return null;

  const choose = (side) => {
    const entry = {
      itemId: current.id,
      choice: side,                     // "left" or "right"
      time: new Date().toISOString()
    };
    const all = [...responses, entry];
    setResponses(all);

    if (index + 1 < shuffled.length) {
      setIndex(i => i + 1);
    } else {
      setFinished(true);
      onComplete(all);
    }
  };

  // Progress bar width
  const progress = ((index + (finished ? 1 : 0)) / shuffled.length) * 100;

  return (
    <div className="preference-bg">
      <div className="preference-card">
        {!finished ? (
          <>
            <div className="preference-question">
              Question {index + 1} of {shuffled.length}
            </div>
            <div className="preference-images">
              <img
                src={current.left}
                alt="Option A"
                className="preference-img"
                onClick={() => choose('left')}
              />
              <img
                src={current.right}
                alt="Option B"
                className="preference-img"
                onClick={() => choose('right')}
              />
            </div>
            <div className="preference-progress">
              <div
                className="preference-progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : (
          <div className="preference-complete">
            Thank you for completing the test! 🎉
          </div>
        )}
      </div>
    </div>
  );
}
