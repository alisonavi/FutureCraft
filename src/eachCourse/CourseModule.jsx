import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './CourseModule.css';

const CourseModule = ({ module, occupationId }) => {
  const navigate = useNavigate();

  const handleModuleClick = () => {
    navigate(`/courses/${occupationId}/${module.moduleId}`);
  };

  return (
    <div
      className="course-module"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={handleModuleClick}
    >
      <div
        className="module-header"
      >
        <h3>{module.moduleTitle}</h3>
        <span className="module-description-brief">{module.moduleDescription}</span>
        <span className="view-module-arrow">→</span>
      </div>
    </div>
  );
};

export default CourseModule;