import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createExperience } from '../../lib/api';
import { useAuth } from '../../hooks/use-auth';
import { toast } from 'react-toastify';

const ExperienceForm = ({ eventId }) => {
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !experience) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      await createExperience({ title, experience, rating, userId: user.id, eventId });
      toast.success('Experience shared successfully!');
      router.push(`/events/${eventId}`);
    } catch (error) {
      toast.error('Failed to share experience. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
          Experience
        </label>
        <textarea
          id="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
          rows="4"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating (1-5)
        </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
      >
        Share Experience
      </button>
    </form>
  );
};

export default ExperienceForm;