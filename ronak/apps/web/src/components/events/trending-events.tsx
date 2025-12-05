import React from 'react';
import { useQuery } from 'react-query';
import { fetchTrendingEvents } from '../../lib/api';
import EventCard from './event-card';

const TrendingEvents = () => {
  const { data: events, isLoading, error } = useQuery('trendingEvents', fetchTrendingEvents);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading trending events</div>;
  }

  return (
    <div className="trending-events">
      <h2 className="text-2xl font-bold mb-4">Trending Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default TrendingEvents;