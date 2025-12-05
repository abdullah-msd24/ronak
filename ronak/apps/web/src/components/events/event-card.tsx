import React from 'react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  location,
  maxParticipants,
  currentParticipants,
  description,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{date}</p>
      <p className="text-gray-600">{location}</p>
      <p className="text-gray-500">{description}</p>
      <div className="mt-2">
        <span className="text-sm text-gray-500">
          {currentParticipants} / {maxParticipants} participants
        </span>
      </div>
      <Link to={`/events/${id}`} className="mt-4 inline-block bg-orange-500 text-white py-2 px-4 rounded">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;