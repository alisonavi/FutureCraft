import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './eachModule.css';
import { marked } from 'marked';

const EachModule = () => {
  const { occupationId, moduleId } = useParams();
  const [course, setCourse] = useState(null);
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await fetch(`https://api.future-craft.ru/api/ai-courses/occupation/${occupationId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'skip_zrok_interstitial': 'true',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCourse(data);
        const foundModule = data.course_data.modules.find(mod => mod.moduleId.toString() === moduleId);
        setModule(foundModule);

      } catch (err) {
        console.error("Failed to fetch module details:", err);
        setError("Failed to load module details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (occupationId && moduleId) {
      fetchModuleDetails();
    }
  }, [occupationId, moduleId]);

  // Clean and convert markdown lesson content to HTML
  const processLessonContent = (raw) => {
    if (!raw) return '';
    let cleaned = raw;
    // Remove <think>...</think> tags
    cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, '');
    // Remove **Lesson ID: ...** and similar headers
    cleaned = cleaned.replace(/\*\*Lesson ID:[^\n]*\*\*\s*/gi, '');
    cleaned = cleaned.replace(/\*\*Title:[^\n]*\*\*\s*/gi, '');
    cleaned = cleaned.replace(/\*\*Lesson Title:[^\n]*\*\*\s*/gi, '');
    cleaned = cleaned.replace(/\*\*Module:[^\n]*\*\*\s*/gi, '');
    cleaned = cleaned.replace(/\*\*ID:[^\n]*\*\*\s*/gi, '');
    // Remove standalone lesson headers without ** formatting
    cleaned = cleaned.replace(/^Lesson ID:[^\n]*\n?/gim, '');
    cleaned = cleaned.replace(/^Title:[^\n]*\n?/gim, '');
    // Remove exercise type indicators
    cleaned = cleaned.replace(/\b(quiz|readingAssignment|writingAssignment)\b\s*\n?/gi, '');
    // Clean up extra whitespace
    cleaned = cleaned.replace(/\n\s*\n/g, '\n\n');
    cleaned = cleaned.trim();
    // Convert markdown to HTML
    return marked.parse(cleaned);
  };

  if (loading) {
    return (
      <div className="each-module-page loading-state">
        <div className="loading-spinner"></div>
        <p>Loading module details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="each-module-page error-state">
        <p>{error}</p>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="each-module-page no-module-found">
        <p>No module found for this ID.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="each-module-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="module-detail-header">
        <h1>{module.moduleTitle}</h1>
        <p><strong>Module ID:</strong> {module.moduleId}</p>
        {course && (
          <p className="course-title-link">From: <a href={`/courses/${occupationId}`}>{course.course_data.courseTitle}</a></p>
        )}
        <p className="module-description">{module.moduleDescription}</p>
        {/* Show any other module fields if present */}
        {Object.entries(module).map(([key, value]) => (
          ["moduleId", "moduleTitle", "moduleDescription", "lessons"].includes(key) ? null : (
            <p key={key}><strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}</p>
          )
        ))}
      </div>

      <div className="module-content-sections">
        {module.lessons && module.lessons.length > 0 ? (
          <>
            <section key={module.lessons[currentLessonIndex].lessonId} className="lesson-section">
              <h2>{module.lessons[currentLessonIndex].lessonId}: {module.lessons[currentLessonIndex].lessonTitle}</h2>
              <div className="lesson-content" dangerouslySetInnerHTML={{ __html: processLessonContent(module.lessons[currentLessonIndex].lessonContent) }} />

              {module.lessons[currentLessonIndex].exercises && module.lessons[currentLessonIndex].exercises.learningObjectives && module.lessons[currentLessonIndex].exercises.learningObjectives.length > 0 && (
                <div className="lesson-objectives">
                  <h3>Learning Objectives</h3>
                  <ul>
                    {module.lessons[currentLessonIndex].exercises.learningObjectives.map((obj, idx) => (
                      <li key={idx}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              {module.lessons[currentLessonIndex].exercises && (
                <div className="exercises-section">
                  <h3>Exercises</h3>
                  {module.lessons[currentLessonIndex].exercises.description ? (() => {
                    const lines = module.lessons[currentLessonIndex].exercises.description.split(/\n|(?=\d+\.\s)/g).map(l => l.trim()).filter(Boolean);
                    const firstIsStep = /^\d+\.\s/.test(lines[0]);
                    const steps = lines.filter(line => /^\d+\.\s/.test(line));
                    const intro = !firstIsStep ? lines[0] : null;
                    return (
                      <>
                        {intro && <p>{intro}</p>}
                        {steps.length > 0 && (
                          <ol style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                            {steps.map((step, idx) => (
                              <li key={idx} style={{ marginBottom: '0.5rem' }}>{step.replace(/^\d+\.\s/, '')}</li>
                            ))}
                          </ol>
                        )}
                        {!intro && steps.length === 0 && <p>{module.lessons[currentLessonIndex].exercises.description}</p>}
                      </>
                    );
                  })() : null}
                  {module.lessons[currentLessonIndex].exercises.questions && module.lessons[currentLessonIndex].exercises.questions.length > 0 && (
                    <div className="exercise-questions">
                      <h4>Questions:</h4>
                      <ul>
                        {module.lessons[currentLessonIndex].exercises.questions.map((question, index) => (
                          <li key={index}>{typeof question === 'string' ? question : question.question}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {module.lessons[currentLessonIndex].exercises.texts && module.lessons[currentLessonIndex].exercises.texts.length > 0 && (
                    <div className="exercise-resources">
                      <h4>Resources:</h4>
                      <ul>
                        {module.lessons[currentLessonIndex].exercises.texts.map((text, index) => (
                          <li key={index}><a href={text} target="_blank" rel="noopener noreferrer">{text}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
              <button
                onClick={() => setCurrentLessonIndex(i => Math.max(i - 1, 0))}
                disabled={currentLessonIndex === 0}
                style={{ padding: '0.7rem 2rem', borderRadius: '8px', border: 'none', background: 'var(--color-accent)', color: 'white', fontWeight: 600, fontSize: '1rem', opacity: currentLessonIndex === 0 ? 0.5 : 1, cursor: currentLessonIndex === 0 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              <span style={{ color: 'var(--color-gray-200)', fontWeight: 500 }}>
                Lesson {currentLessonIndex + 1} of {module.lessons.length}
              </span>
              <button
                onClick={() => setCurrentLessonIndex(i => Math.min(i + 1, module.lessons.length - 1))}
                disabled={currentLessonIndex === module.lessons.length - 1}
                style={{ padding: '0.7rem 2rem', borderRadius: '8px', border: 'none', background: 'var(--color-accent)', color: 'white', fontWeight: 600, fontSize: '1rem', opacity: currentLessonIndex === module.lessons.length - 1 ? 0.5 : 1, cursor: currentLessonIndex === module.lessons.length - 1 ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No lessons available for this module.</p>
        )}
      </div>
    </motion.div>
  );
};

export default EachModule;