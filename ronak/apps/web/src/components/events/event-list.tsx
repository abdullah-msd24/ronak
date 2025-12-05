import React from 'react';
import { EventCard } from './event-card';
import { useEvents } from '../../hooks/use-events';

const EventList: React.FC = () => {
    const { events, isLoading, error } = useEvents();

    if (isLoading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>Error loading events: {error.message}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
};

export default EventList;