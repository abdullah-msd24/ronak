import { useState, useEffect } from 'react';
import { fetchExperiences } from '../lib/api';

const useExperiences = (eventId) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await fetchExperiences(eventId);
        setExperiences(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, [eventId]);

  return { experiences, loading, error };
};

export default useExperiences;