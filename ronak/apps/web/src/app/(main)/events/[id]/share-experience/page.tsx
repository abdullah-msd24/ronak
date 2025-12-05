import { useState } from 'react';
import { useRouter } from 'next/router';
import { createExperience } from '@/lib/api';
import { useAuth } from '@/hooks/use-auth';

const ShareExperiencePage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !experience) {
      setError('Title and experience details are required.');
      return;
    }

    try {
      await createExperience({ eventId: id, title, experience, rating });
      router.push(`/events/${id}`);
    } catch (err) {
      setError('Failed to share experience. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Share Your Experience</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Experience</label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border rounded w-full p-2"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border rounded w-full p-2"
            min="1"
            max="5"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Share Experience
        </button>
      </form>
    </div>
  );
};

export default ShareExperiencePage;