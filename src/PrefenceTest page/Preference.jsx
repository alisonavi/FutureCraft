// src/components/PreferenceTest.jsx
import React, { useState, useEffect } from 'react';
import './Preference.css';

const likertOptions = [1, 2, 3, 4, 5];
const likertLabels = {
  1: 'Hate it',
  5: 'Love it',
};
const likertSizes = {
  1: 74,
  2: 58,
  3: 46,
  4: 58,
  5: 74,
};

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
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  // Shuffle once when items first arrive
  useEffect(() => {
    setShuffled(shuffle([...items]));
  }, [items]);

  const current = shuffled[index];
  if (!current && !finished) return null;

  const handleSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const handleNext = () => {
    if (index + 1 < shuffled.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
      // Prepare results in order of shuffled
      const results = shuffled.map(q => ({
        itemId: q.id,
        choice: answers[q.id],
        time: new Date().toISOString()
      }));
      onComplete(results);
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
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
            <div className="preference-main-question">
              {current.question}
            </div>
            <div className="likert-circles-row">
              <span className="likert-label left">Hate it</span>
              <div className="likert-circles-row-inner">
                {likertOptions.map(opt => (
                  <label
                    key={opt}
                    className={`likert-circle-label${answers[current.id] === opt ? ' selected' : ''}`}
                    style={{ width: likertSizes[opt], height: likertSizes[opt] }}
                  >
                    <input
                      type="radio"
                      name={`likert-${current.id}`}
                      value={opt}
                      checked={answers[current.id] === opt}
                      onChange={() => handleSelect(opt)}
                    />
                    <span className="likert-circle" style={{ width: likertSizes[opt], height: likertSizes[opt] }}></span>
                  </label>
                ))}
              </div>
              <span className="likert-label right">Love it</span>
            </div>
            <div className="likert-nav-row">
              <button className="likert-nav-btn" onClick={handlePrev} disabled={index === 0} aria-label="Previous">
                &#x25C0;
              </button>
              <button
                className="likert-nav-btn"
                onClick={handleNext}
                disabled={typeof answers[current.id] === 'undefined'}
                aria-label={index + 1 === shuffled.length ? 'Submit' : 'Next'}
              >
                &#x25B6;
              </button>
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
