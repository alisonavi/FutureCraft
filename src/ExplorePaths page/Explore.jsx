import React, { useState } from 'react';
import './Explore.css';
import techIcon from '../assets/goofy5.jpg';
import businessIcon from '../assets/goofy1.jpg';
import creativeIcon from '../assets/goofy2.jpg';
import scienceIcon from '../assets/goofy3.jpg';
import healthcareIcon from '../assets/goofy4.jpg';

const Explore = () => {
  const [selectedPath, setSelectedPath] = useState(null);

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
    }
  ];

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h1>Explore Career Paths</h1>
        <p>Discover your potential and find the perfect career path that matches your interests and skills.</p>
      </div>

      <div className="paths-grid">
        {careerPaths.map((path) => (
          <div
            key={path.id}
            className={`path-card ${selectedPath === path.id ? 'selected' : ''}`}
            onClick={() => setSelectedPath(path.id)}
          >
            <img src={path.icon} alt={path.title} className="path-icon" />
            <h3>{path.title}</h3>
            <p>{path.description}</p>
            <div className="career-list">
              {path.careers.map((career, index) => (
                <div key={index} className="career-item">
                  <h4>{career.title}</h4>
                  <p>{career.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="explore-cta">
        <h2>Ready to Find Your Path?</h2>
        <p>Take our preference test to get personalized career recommendations.</p>
        <button onClick={() => window.location.href = '/preftest'}>Take the Test</button>
      </div>
    </div>
  );
};

export default Explore;