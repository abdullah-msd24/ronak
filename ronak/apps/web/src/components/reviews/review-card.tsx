import React from 'react';

interface ReviewCardProps {
  reviewerName: string;
  reviewText: string;
  rating: number;
  createdAt: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ reviewerName, reviewText, rating, createdAt }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="font-semibold text-lg">{reviewerName}</h3>
      <p className="text-gray-600 text-sm">{new Date(createdAt).toLocaleDateString()}</p>
      <div className="mt-2">
        <p className="text-gray-800">{reviewText}</p>
      </div>
      <div className="mt-2">
        <span className="text-yellow-500">{'★'.repeat(rating)}</span>
        <span className="text-gray-400">{'★'.repeat(5 - rating)}</span>
      </div>
    </div>
  );
};

export default ReviewCard;