import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ThreeCardsSection.css';
import ChatBot from './ChatBot';

const careerPaths = [
  { date: 'Monday, June 16, 2025', title: 'AI & Data Science Bootcamp', fields: ['Data Science', 'AI Engineering'] },
  { date: 'Wednesday, June 18, 2025', title: 'Creative Design Sprint', fields: ['Graphic Design', 'UX/UI'] },
  { date: 'Friday, June 27, 2025', title: 'Healthcare & Well-being Panel', fields: ['Nursing', 'Therapy'] },
  { date: 'Monday, July 2, 2025', title: 'Sustainability Careers Forum', fields: ['Environmental Policy', 'Green Energy'] },
  { date: 'Friday, July 11, 2025', title: 'Business & Analytics Day', fields: ['Business Intelligence', 'Analytics'] },
];

export default function ThreeCardsSection() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.three-card').offsetWidth;
      const containerWidth = carouselRef.current.offsetWidth;
      const cardsPerView = Math.floor(containerWidth / cardWidth);
      setMaxIndex(careerPaths.length - cardsPerView);
    }
  }, []);

  const scroll = (dir) => {
    if (!carouselRef.current) return;

    const newIndex = currentIndex + dir;
    if (newIndex >= 0 && newIndex <= maxIndex) {
      const cardWidth = carouselRef.current.querySelector('.three-card').offsetWidth;
      const scrollAmount = cardWidth * dir;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section className="three-section">
      <h2 className="three-title">Upcoming Career Paths</h2>

      <div className="three-carousel-wrapper">
        <button
          className="three-nav three-nav-prev"
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          disabled={currentIndex === 0}
        >
          ←
        </button>

        <div className="three-carousel" ref={carouselRef}>
          {careerPaths.map((item, i) => (
            <div className="three-card" key={i}>
              <div className="three-meta">{item.date}</div>
              <h3 className="three-card-title">{item.title}</h3>
              <div className="three-fields">
                {item.fields.map((f, idx) => (
                  <span className="three-field" key={idx}>{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="three-nav three-nav-next"
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          disabled={currentIndex === maxIndex}
        >
          →
        </button>
      </div>

      <div className="three-view-all">
        <a href="/explore">View all career paths →</a>
      </div>
      <ChatBot />
    </section>
  );
}
