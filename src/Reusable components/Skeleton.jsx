import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type, count = 1 }) => {
  const elements = Array(count).fill(0);
  
  const getSkeletonClass = () => {
    switch (type) {
      case 'text':
        return 'skeleton-text';
      case 'title':
        return 'skeleton-title';
      case 'avatar':
        return 'skeleton-avatar';
      case 'thumbnail':
        return 'skeleton-thumbnail';
      case 'card':
        return 'skeleton-card';
      default:
        return 'skeleton-text';
    }
  };

  return (
    <>
      {elements.map((_, index) => (
        <div
          key={index}
          className={`skeleton ${getSkeletonClass()}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </>
  );
};

export default Skeleton; 