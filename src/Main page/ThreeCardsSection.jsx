import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ThreeCardsSection.css';

const careerPaths = [
  { date: 'Monday, June 3, 2025', title: 'AI & Data Science Bootcamp', fields: ['Data Science', 'AI Engineering'] },
  { date: 'Wednesday, June 5, 2025', title: 'Creative Design Sprint', fields: ['Graphic Design', 'UX/UI'] },
  { date: 'Friday, June 7, 2025', title: 'Healthcare & Well-being Panel', fields: ['Nursing', 'Therapy'] },
  { date: 'Monday, June 10, 2025', title: 'Sustainability Careers Forum', fields: ['Environmental Policy', 'Green Energy'] },
  { date: 'Thursday, June 13, 2025', title: 'Business & Analytics Day', fields: ['Business Intelligence', 'Analytics'] },
];

export default function ThreeCardsSection() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  // width = card width + gap
  const scrollAmount = carouselRef.current
    ? carouselRef.current.querySelector('.three-card').offsetWidth + 16
    : 316;

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="three-section">
      <h2 className="three-title">Upcoming Career Paths</h2>

      <div className="three-carousel-wrapper">
        <button
          className="three-nav three-nav-prev"
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
        >
          ←
        </button>

        <div className="three-carousel" ref={carouselRef}>
          {careerPaths.slice(0, 3).map((item, i) => (
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
        >
          →
        </button>
      </div>

      <div className="three-view-all">
        <a href="/explore">View all career paths →</a>
      </div>
    </section>
  );
}
