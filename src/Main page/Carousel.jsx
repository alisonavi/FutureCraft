import React, { useState, useEffect, useCallback } from 'react';
import './Carousel.css';
import slide1 from '../assets/carousel11.png';
import slide4 from '../assets/carousel2.jpg';
import slide3 from '../assets/carousel33.jpg';
import slide2 from '../assets/lox.png'
import slide5 from '../assets/carousel555.png';

const SLIDE_WIDTH = 1200;
const SLIDE_HEIGHT = 675;
const AUTO_SCROLL_INTERVAL = 7000; // 7 seconds

const slides = [
  { 
    image: slide1,
    title: "Discover Your Future",
    description: "Explore career paths tailored to your interests and skills",
    buttonText: "Start Journey",
    buttonLink: "/preference-test"
  },
  { 
    image: slide2,
    title: "AI-Powered Guidance",
    description: "Get personalized recommendations from our advanced AI system",
    buttonText: "Learn More",
    buttonLink: "/explore-paths"
  },
  { 
    image: slide3,
    title: "Interactive Learning",
    description: "Experience our immersive game-based learning platform",
    buttonText: "Play Now",
    buttonLink: "/game"
  },
  { 
    image: slide4,
    title: "Expert Insights",
    description: "Access industry insights and career development resources",
    buttonText: "Explore Resources",
    buttonLink: "/resources"
  },
  { 
    image: slide5,
    title: "Join Our Community",
    description: "Connect with like-minded individuals and career mentors",
    buttonText: "Sign Up",
    buttonLink: "/register"
  }
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const [isPaused, setIsPaused] = useState(false);

  const goToNextSlide = useCallback(() => {
    setDirection('right');
    setPrevIndex(activeIndex);
    setActiveIndex((current) => (current + 1) % slides.length);
  }, [activeIndex]);

  const handleDotClick = (idx) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 'right' : 'left');
    setPrevIndex(activeIndex);
    setActiveIndex(idx);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNextSlide, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, goToNextSlide]);

  return (
    <div className="carousel-wrapper">
      <div
        className="slider slide-anim-root"
        style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT, margin: '3rem auto', position: 'relative' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, idx) => {
          let className = 'slide-anim';
          if (idx === activeIndex) className += ` active ${direction}`;
          else if (idx === prevIndex) className += ` prev ${direction}`;
          else return null;
          return (
            <div
              className={className}
              key={idx}
              style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT, position: 'absolute', top: 0, left: 0 }}
            >
              <div className="slide-overlay" />
              <img src={slide.image} alt={`Slide ${idx + 1}`} />
              <div className="slide-content">
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-description">{slide.description}</p>
                <a href={slide.buttonLink} className="slide-button">
                  {slide.buttonText}
                </a>
              </div>
            </div>
          );
        })}
        <div className="slider-nav">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`dot${activeIndex === idx ? ' active' : ''}`}
              onClick={() => handleDotClick(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;