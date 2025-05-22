import React, { useState, useEffect, useCallback } from 'react';
import './Explore.css';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import techIcon from '../assets/goofy5.jpg';
import businessIcon from '../assets/goofy1.jpg';
import creativeIcon from '../assets/goofy2.jpg';
import scienceIcon from '../assets/goofy3.jpg';
import healthcareIcon from '../assets/goofy4.jpg';

const Explore = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const { addToast } = useToast();

  const handleTouchStart = useCallback((e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (window.scrollY === 0 && startY > 0) {
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;
      if (distance > 0) {
        setPullDistance(Math.min(distance * 0.5, 100));
      }
    }
  }, [startY]);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance > 50) {
      setIsRefreshing(true);
      try {
        // Simulate data refresh
        await new Promise(resolve => setTimeout(resolve, 1000));
        addToast('Content refreshed successfully!', 'success');
      } catch (error) {
        addToast('Failed to refresh content', 'error');
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
    setStartY(0);
  }, [pullDistance, addToast]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const careerPaths = [
    {
      id: 'tech',
      title: 'Technology & Engineering',
      icon: techIcon,
      description: 'Explore careers in software development, data science, cybersecurity, and more.',
      careers: [
        { title: 'Software Developer', description: 'Create and maintain software applications and systems.' },
        { title: 'Data Scientist', description: 'Analyze complex data sets to help guide business decisions.' },
        { title: 'Cybersecurity Analyst', description: 'Protect systems and networks from digital attacks.' }
      ]
    },
    {
      id: 'business',
      title: 'Business & Finance',
      icon: businessIcon,
      description: 'Discover opportunities in management, finance, marketing, and entrepreneurship.',
      careers: [
        { title: 'Business Analyst', description: 'Analyze business processes and recommend improvements.' },
        { title: 'Financial Advisor', description: 'Help clients manage their finances and investments.' },
        { title: 'Marketing Manager', description: 'Develop and implement marketing strategies.' }
      ]
    },
    {
      id: 'creative',
      title: 'Creative Arts & Design',
      icon: creativeIcon,
      description: 'Find your path in graphic design, digital media, architecture, and more.',
      careers: [
        { title: 'Graphic Designer', description: 'Create visual content for various media platforms.' },
        { title: 'UX/UI Designer', description: 'Design user-friendly digital interfaces.' },
        { title: 'Architect', description: 'Design buildings and structures.' }
      ]
    },
    {
      id: 'science',
      title: 'Science & Research',
      icon: scienceIcon,
      description: 'Explore careers in scientific research, environmental science, and laboratory work.',
      careers: [
        { title: 'Research Scientist', description: 'Conduct research to advance knowledge in science.' },
        { title: 'Environmental Scientist', description: 'Study environmental problems and solutions.' },
        { title: 'Laboratory Technician', description: 'Support scientific research and testing.' }
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Medicine',
      icon: healthcareIcon,
      description: 'Discover opportunities in patient care, medical research, and healthcare administration.',
      careers: [
        { title: 'Medical Doctor', description: 'Diagnose and treat patients\' illnesses and injuries.' },
        { title: 'Nurse', description: 'Provide patient care and support in healthcare settings.' },
        { title: 'Healthcare Administrator', description: 'Manage healthcare facilities and services.' }
      ]
    },
    {
      id: 'education',
      title: 'Education & Teaching',
      icon: businessIcon,
      description: 'Shape the future by teaching, mentoring, and supporting learners of all ages.',
      careers: [
        { title: 'Teacher', description: 'Educate students in schools or colleges.' },
        { title: 'Academic Advisor', description: 'Guide students in their academic journey.' },
        { title: 'Education Administrator', description: 'Oversee educational programs and institutions.' }
      ]
    }
  ];

  return (
    <div className="page-content">
      <div className="explore-container">
        <AnimatePresence>
          {pullDistance > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pull-indicator"
              style={{ transform: `translateY(${pullDistance}px)` }}
            >
              {isRefreshing ? (
                <div className="loading-spinner" />
              ) : (
                <span>Pull to refresh</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="explore-header">
          <h1>Explore Career Paths</h1>
          <p>Discover your potential and find the perfect career path that matches your interests and skills.</p>
        </div>

        <div className="paths-grid">
          {careerPaths.map((path) => (
            <motion.div
              key={path.id}
              className={`path-card ${selectedPath === path.id ? 'selected' : ''}`}
              onClick={() => setSelectedPath(path.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={path.icon} alt={path.title} className="path-icon" />
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <div className="career-list">
                {path.careers.map((career, index) => (
                  <motion.div
                    key={index}
                    className={`career-item fade-in fade-in-${index + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4>{career.title}</h4>
                    <p>{career.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="explore-cta"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h2>Ready to Find Your Path?</h2>
          <p>Take our preference test to get personalized career recommendations.</p>
          <motion.button 
            onClick={() => window.location.href = '/preftest'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Take the Test
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;