import React from 'react';

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, onClick, className }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition ${className}`}
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;