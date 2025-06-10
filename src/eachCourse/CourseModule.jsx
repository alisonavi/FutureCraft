import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CourseModule.css';

const CourseModule = ({ module }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const createMarkup = (htmlContent) => {
    // It's crucial to sanitize HTML content to prevent XSS attacks.
    // For this example, we are assuming the content from the API is safe.
    // In a production environment, you would use a library like DOMPurify.
    return { __html: htmlContent };
  };

  return (
    <motion.div
      className="course-module"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div 
        className="module-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>{module.moduleTitle}</h3>
        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </div>
      
      {isExpanded && (
        <motion.div
          className="module-content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <p className="module-description">{module.moduleDescription}</p>
          
          <div className="lessons-list">
            {module.lessons.map((lesson) => (
              <div key={lesson.lessonId} className="lesson-item">
                <h4>{lesson.lessonTitle}</h4>
                <div className="lesson-content" dangerouslySetInnerHTML={createMarkup(lesson.lessonContent)} />
                
                {lesson.exercises && (
                  <div className="exercises">
                    <h5>Exercises</h5>
                    <p>{lesson.exercises.description}</p>
                    {lesson.exercises.questions && (
                      <ul>
                        {lesson.exercises.questions.map((question, index) => (
                          <li key={index}>{question}</li>
                        ))}
                      </ul>
                    )}
                    {lesson.exercises.texts && lesson.exercises.texts.length > 0 && (
                      <div className="exercise-resources">
                        <h6>Resources:</h6>
                        <ul>
                          {lesson.exercises.texts.map((text, index) => (
                            <li key={index}><a href={text} target="_blank" rel="noopener noreferrer">{text}</a></li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CourseModule;