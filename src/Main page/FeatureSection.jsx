import React from 'react';
import './FeatureSection.css';
import feature1 from '../assets/feature1.png';
import feature2 from '../assets/feature2.webp';
import feature3 from '../assets/feature3.png';
const FeatureSection = () => {
  return (
    <section className="feature-section">
      <div className="feature-content">
        <img src={feature1} alt="Person using tablet" className="fade-in fade-in-1" />
        <div className="feature-text">
          <h2 className="fade-in fade-in-2">Personalized Career Insights</h2>
          <p className="fade-in fade-in-3">
            At FutureCraft, we believe that every individual deserves to discover their unique career path.
            Our personalized insights help you identify strengths and preferences, ensuring you find the right
            direction for your future.
          </p>
        </div>
      </div>
      <div className="feature-content">
        <img src={feature2} alt="Person using tablet" className="fade-in fade-in-4" />
        <div className="feature-text">
          <h2 className="fade-in fade-in-5">Diverse Career Paths</h2>
          <p className="fade-in fade-in-6">
            Explore a wide range of career options that suit your interests and aspirations. FutureCraft provides comprehensive resources on various fields, helping you make informed decisions that resonate with your goals.
          </p>
        </div>
      </div>
      <div className="feature-content">
        <img src={feature3} alt="Person using tablet" className="fade-in fade-in-7" />
        <div className="feature-text">
          <h2 className="fade-in fade-in-8">Community Support</h2>
          <p className="fade-in fade-in-9">
            Join a vibrant community of like-minded individuals on their career journeys. Engage in discussions, share experiences, and seek advice that fosters growth and collaboration within the FutureCraft ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;