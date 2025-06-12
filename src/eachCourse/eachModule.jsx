import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './eachModule.css';

const EachModule = () => {
  const { occupationId, moduleId } = useParams();
  const [course, setCourse] = useState(null);
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await fetch(`https://207.127.93.193/api/ai-courses/occupation/${occupationId}`, {
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

  const createMarkup = (htmlContent) => {
    // It's crucial to sanitize HTML content to prevent XSS attacks.
    // For this example, we are assuming the content from the API is safe.
    // In a production environment, you would use a library like DOMPurify.
    return { __html: htmlContent };
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
        {course && (
          <p className="course-title-link">From: <a href={`/courses/${occupationId}`}>{course.course_data.courseTitle}</a></p>
        )}
        <p className="module-description">{module.moduleDescription}</p>
      </div>

      <div className="module-content-sections">
        {module.lessons && module.lessons.length > 0 ? (
          module.lessons.map((lesson) => (
            <section key={lesson.lessonId} className="lesson-section">
              <h2>{lesson.lessonTitle}</h2>
              <div className="lesson-content" dangerouslySetInnerHTML={createMarkup(lesson.lessonContent)} />

              {lesson.exercises && (
                <div className="exercises-section">
                  <h3>Exercises</h3>
                  <p>{lesson.exercises.description}</p>
                  {lesson.exercises.questions && lesson.exercises.questions.length > 0 && (
                    lesson.exercises.questions.filter(q => q.question && q.question.trim() !== '').length > 0 && (
                      <div className="exercise-questions">
                        <h4>Questions:</h4>
                        <ul>
                          {lesson.exercises.questions.filter(q => q.question && q.question.trim() !== '').map((question, index) => (
                            <li key={index}>{question.question}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                  {lesson.exercises.texts && lesson.exercises.texts.length > 0 && (
                    <div className="exercise-resources">
                      <h4>Resources:</h4>
                      <ul>
                        {lesson.exercises.texts.map((text, index) => (
                          <li key={index}><a href={text} target="_blank" rel="noopener noreferrer">{text}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </section>
          ))
        ) : (
          <p>No lessons available for this module.</p>
        )}
      </div>
    </motion.div>
  );
};

export default EachModule;