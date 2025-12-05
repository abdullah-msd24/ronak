import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getEventDetails } from '@/lib/api';
import EventDetails from '@/components/events/event-details';
import LoadingSpinner from '@/components/ui/loading-spinner';

const EventPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchEventDetails = async () => {
        try {
          const data = await getEventDetails(id);
          setEvent(data);
        } catch (err) {
          setError('Failed to load event details.');
        } finally {
          setLoading(false);
        }
      };

      fetchEventDetails();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {event ? (
        <EventDetails event={event} />
      ) : (
        <div>No event found.</div>
      )}
    </div>
  );
};

export default EventPage;