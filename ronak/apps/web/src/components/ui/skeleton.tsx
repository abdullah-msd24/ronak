import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
    </div>
  );
};

export default Skeleton;