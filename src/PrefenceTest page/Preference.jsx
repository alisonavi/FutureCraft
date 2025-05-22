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

// Question tips for each question
const questionTips = {
  '1': 'Technical skills are highly valued in today\'s job market. Many careers require some level of computer literacy.',
  '2': 'Healthcare is one of the fastest-growing sectors. Helping others can be very rewarding.',
  '3': 'Teaching and mentoring skills are valuable in many professions, not just education.',
  '4': 'Creative skills are increasingly important in the digital age.',
  '5': 'Business analysis skills are crucial for making data-driven decisions.',
  '6': 'Scientific thinking helps develop problem-solving abilities.',
  '7': 'Social skills are essential for networking and team collaboration.',
  '8': 'Software development is a high-demand field with excellent growth potential.',
  '9': 'Mental health awareness is becoming increasingly important in the workplace.',
  '10': 'Problem-solving skills are highly valued across all industries.',
  '11': 'Teamwork is a fundamental skill in most modern workplaces.',
  '12': 'Leadership skills can open doors to management positions.',
  '13': 'Environmental awareness is growing in importance across industries.',
  '14': 'Communication skills are essential in any career path.',
  '15': 'Financial literacy is valuable in both personal and professional life.',
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
  const [careerMatches, setCareerMatches] = useState([]);

  useEffect(() => {
    setShuffled(shuffle([...items]));
  }, [items]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setCareerMatches(getCareerMatches(answers));
    }
  }, [answers]);

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

        <div className="preference-sidebar">
          <div className="question-tip">
            <h3>Why This Matters</h3>
            <p>{questionTips[current?.id] || 'Your preferences help us understand your career interests.'}</p>
          </div>

          <div className="live-preview">
            <h3>Your Top Matches</h3>
            <div className="matches-list">
              {careerMatches.length > 0 ? (
                careerMatches.map((match, idx) => (
                  <div key={idx} className="match-item">
                    <span className="match-icon">🎯</span>
                    <span className="match-text">{match}</span>
                  </div>
                ))
              ) : (
                <p className="no-matches">Answer more questions to see your matches</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
