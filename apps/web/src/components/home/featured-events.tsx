import React from 'react';
import { useEvents } from '../../hooks/use-events';
import EventCard from '../events/event-card';

const FeaturedEvents = () => {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading events</div>;
  }

  return (
    <section className="featured-events">
      <h2 className="text-2xl font-bold mb-4">Featured Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;