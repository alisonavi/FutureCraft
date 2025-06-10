import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://207.127.93.193/api/ai-courses', {
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
        setCourses(data.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="courses-page loading-state">
        <div className="loading-spinner"></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-page error-state">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="courses-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="courses-container">
        <aside className="courses-sidebar">
          <div className="sidebar-header">
            <h2>Categories</h2>
          </div>
          <nav className="category-nav">
            <button
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Courses
            </button>
            <button
              className={`category-btn ${selectedCategory === 'ai' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ai')}
            >
              AI & Machine Learning
            </button>
            <button
              className={`category-btn ${selectedCategory === 'data' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('data')}
            >
              Data Science
            </button>
            <button
              className={`category-btn ${selectedCategory === 'web' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('web')}
            >
              Web Development
            </button>
          </nav>
        </aside>

        <main className="courses-main">
          <div className="courses-header">
            <h1>AI-Powered Career Courses</h1>
            <p>Explore a variety of courses designed to advance your career in AI-driven fields.</p>
          </div>

          <div className="courses-grid">
            {courses.length > 0 ? (
              courses.map((course) => (
                <motion.div
                  key={course.id}
                  className="course-card"
                >
                  <div className="course-content">
                    <h2>{course.course_title}</h2>
                    <p className="course-overview">{course.overview}</p>
                    <div className="course-meta">
                      <span className="modules-count">
                        <i className="fas fa-book"></i>
                        {course.modules_count} Modules
                      </span>
                      <button className="enroll-btn">Enroll Now</button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="no-courses-found">
                <p>No courses found at the moment. Please check back later!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default Courses; 