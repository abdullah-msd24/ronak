import React from 'react';

interface ExperienceCardProps {
  title: string;
  experience: string;
  rating?: number;
  author: string;
  date: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, experience, rating, author, date }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-700 mt-2">{experience}</p>
      {rating && (
        <div className="mt-2">
          <span className="text-yellow-500">{'★'.repeat(rating)}</span>
          <span className="text-gray-400">{'★'.repeat(5 - rating)}</span>
        </div>
      )}
      <div className="mt-4 text-sm text-gray-500">
        <p>By {author}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;