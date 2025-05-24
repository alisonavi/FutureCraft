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

// Career matches based on answers (logistic scoring)
const areaMap = {
  '1': 'Technology',
  '2': 'Healthcare',
  '3': 'Education',
  '4': 'Creative Arts',
  '5': 'Business',
  '6': 'Science',
  '7': 'Social Services',
  '8': 'Software Development',
  '9': 'Mental Health',
  '10': 'Analytics',
  '11': 'Team Management',
  '12': 'Leadership',
  '13': 'Environmental Science',
  '14': 'Content Creation',
  '15': 'Finance',
};

const getCareerMatches = (answers) => {
  // Scoring: 1 (hate) = -2, 2 = -1, 3 = 0, 4 = +1, 5 (love) = +2
  const scoreMap = { 1: -2, 2: -1, 3: 0, 4: 1, 5: 2 };
  const areaScores = {};
  Object.entries(answers).forEach(([qid, val]) => {
    const area = areaMap[qid];
    if (!area) return;
    if (!areaScores[area]) areaScores[area] = 0;
    areaScores[area] += scoreMap[val] || 0;
  });
  // Only keep areas with positive scores
  const sorted = Object.entries(areaScores)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([area]) => area);
  return sorted.slice(0, 3);
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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setShuffled(shuffle([...items]));
  }, [items]);

  const current = shuffled[index];
  if (!current && !finished) return null;

  const handleSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const handleNext = async () => {
    if (index + 1 < shuffled.length) {
      setIndex(index + 1);
    } else {
      setSubmitting(true);
      setSubmitError('');
      try {
        const responses = shuffled.map(q => ({
          preference_test_id: Number(q.id),
          score: answers[q.id]
        }));
        const res = await fetch('https://207.127.93.193/api/preference-tests/responses', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ responses })
        });
        if (!res.ok) throw new Error('Failed to submit responses');
        setSubmitSuccess(true);
        setFinished(true);
      } catch (err) {
        setSubmitError('Could not submit your answers. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const progress = ((index + (finished ? 1 : 0)) / shuffled.length) * 100;

  return (
    <div className="preference-bg">
      <div className="preference-container">
        <div className="preference-main">
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
                {/* Navigation arrows for all but last question */}
                {index + 1 < shuffled.length && (
                  <div className="likert-nav-row">
                    <button className="likert-nav-btn" onClick={handlePrev} disabled={index === 0} aria-label="Previous">
                      &#x25C0;
                    </button>
                    <button
                      className="likert-nav-btn"
                      onClick={handleNext}
                      disabled={typeof answers[current.id] === 'undefined' || submitting}
                      aria-label="Next"
                    >
                      <span>&#x25B6;</span>
                    </button>
                  </div>
                )}
                {/* Submit button for last question, only after answer selected */}
                {index + 1 === shuffled.length && typeof answers[current.id] !== 'undefined' && (
                  <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                    <button
                      className="likert-submit-btn"
                      onClick={handleNext}
                      disabled={submitting}
                      style={{
                        background: 'var(--gradient-accent)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        border: 'none',
                        borderRadius: '2rem',
                        padding: '1rem 3rem',
                        boxShadow: '0 4px 24px rgba(0,177,229,0.15)',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      {submitting ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span className="loading-spinner" style={{ width: 24, height: 24, border: '3px solid #fff', borderTop: '3px solid #00b1e5', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>
                          Submitting...
                        </span>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                )}
                <div className="preference-progress">
                  <div
                    className="preference-progress-bar"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {submitError && <div style={{ color: 'salmon', marginTop: '1rem' }}>{submitError}</div>}
                <style>{`
                  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
              </>
            ) : (
              <div className="preference-complete">
                {submitSuccess ? 'Thank you for completing the test! 🎉' : 'Test complete.'}
              </div>
            )}
          </div>
        </div>
        <div className="preference-sidebar">
          <div className="question-tip">
            <h3>Why This Matters</h3>
            <p>{current?.description || 'Your preferences help us understand your career interests.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
