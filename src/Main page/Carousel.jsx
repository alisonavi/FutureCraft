import React, { useState } from 'react';
import './Carousel.css';
import slide1 from '../assets/carousel1.png';
import slide2 from '../assets/carousel2.jpg';
import slide3 from '../assets/carousel3.jpg';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    {
      image: slide1,
      title: 'Join Our Thriving Community',
      description: 'Connect with individuals who share your aspirations. Together, we can learn, grow, and support each other in our career endeavors.',
      buttonText: 'Get Involved'
    },
    {
      image: slide2,
      title: 'Discover Your Potential',
      description: "Unearth your unique skills and interests with FutureCraft's engaging preference test. Begin your journey towards a career that truly fits you.",
      buttonText: 'Take the Test'
    },
    {
      image: slide3,
      title: 'Explore Diverse Opportunities',
      description: 'Navigate through various career paths tailored to your preferences. FutureCraft offers insights to help you make informed career choices.',
      buttonText: 'Learn More'
    }
  ];

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      <button className="carousel-nav prev" onClick={handlePrev}>
        &lt;
      </button>
      <div className="carousel-slides"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
          >
            <img src={slide.image} alt={slide.title} className="fade-in fade-in-1" />
            <div className="slide-content">
              <h2 className="fade-in fade-in-2">{slide.title}</h2>
              <p className="fade-in fade-in-3">{slide.description}</p>
              <button className="fade-in fade-in-4">{slide.buttonText}</button>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-nav next" onClick={handleNext}>
        &gt;
      </button>
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            &nbsp;
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;