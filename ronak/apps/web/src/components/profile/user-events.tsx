import React from 'react';
import { useEvents } from '../../hooks/use-events';
import EventCard from '../events/event-card';

const UserEvents = ({ userId }) => {
    const { events, isLoading, error } = useEvents(userId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading events: {error.message}</div>;
    }

    return (
        <div className="user-events">
            <h2 className="text-2xl font-bold mb-4">User Events</h2>
            {events.length === 0 ? (
                <p>No events found for this user.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserEvents;