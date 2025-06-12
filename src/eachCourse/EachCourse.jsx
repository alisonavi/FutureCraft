import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CourseModule from './CourseModule';
import './EachCourse.css';
const EachCourse = () => {
  const navigate = useNavigate();
  const { occupationId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to='/login' />
  }

  useEffect(() => {
    const fetchCourseDetails = async () => {
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
      } catch (err) {
        console.error("Failed to fetch course details:", err);
        setError("Failed to load course details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (occupationId) {
      fetchCourseDetails();
    }
  }, [occupationId]);

  if (loading) {
    return (
      <div className="each-course-page loading-state">
        <div className="loading-spinner"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="each-course-page error-state">
        <p>{error}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="each-course-page no-course-found">
        <p>No course found for this ID.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="each-course-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="course-detail-header">
        <h1>{course.course_data.courseTitle}</h1>
        <p className="course-overview">{course.course_data.overview}</p>
      </div>

      <div className="course-content-sections">
        <section className="learning-objectives-section">
          <h2>What you'll learn</h2>
          <ul className="learning-objectives-list">
            {course.course_data.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </section>

        <section className="course-modules-section">
          <h2>Course Modules</h2>
          <div className="modules-list">
            {course.course_data.modules && course.course_data.modules.length > 0 ? (
              course.course_data.modules.map((module) => (
                <CourseModule
                  key={module.moduleId}
                  module={module}
                  occupationId={occupationId}
                />
              ))
            ) : (
              <p>No modules available for this course.</p>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default EachCourse;