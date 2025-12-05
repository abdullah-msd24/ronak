import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/toast';
import { createReview } from '../../lib/api';

const ReviewForm = ({ eventId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createReview(eventId, data);
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'Title is required' })}
          className={`mt-1 block w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
        <textarea
          id="experience"
          {...register('experience', { required: 'Experience is required' })}
          rows="4"
          className={`mt-1 block w-full border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        />
        {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
      </div>
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
        <select
          id="rating"
          {...register('rating', { required: 'Rating is required' })}
          className={`mt-1 block w-full border ${errors.rating ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
        >
          <option value="">Select a rating</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>{star}</option>
          ))}
        </select>
        {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 bg-orange-600 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-700'}`}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;