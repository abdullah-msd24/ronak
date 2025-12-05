import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createEvent } from '../../../lib/api';
import EventForm from '../../../components/events/event-form';

const CreateEventPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (eventData) => {
    setLoading(true);
    setError(null);
    try {
      await createEvent(eventData);
      router.push('/events');
    } catch (err) {
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      {error && <p className="text-red-500">{error}</p>}
      <EventForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreateEventPage;