import { useEffect, useState } from 'react';
import { fetchReviews, createReview } from '../lib/api';
import { Review } from '../types';

const useReviews = (eventId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const fetchedReviews = await fetchReviews(eventId);
        setReviews(fetchedReviews);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [eventId]);

  const addReview = async (reviewData: Omit<Review, 'id'>) => {
    try {
      const newReview = await createReview(eventId, reviewData);
      setReviews((prev) => [...prev, newReview]);
    } catch (err) {
      setError('Failed to add review');
    }
  };

  return { reviews, loading, error, addReview };
};

export default useReviews;