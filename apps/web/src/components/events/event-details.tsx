import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getEventDetails } from '../../lib/api';
import EventParticipants from '../../components/events/event-participants';
import EventChat from '../../components/events/event-chat';
import ExperienceList from '../../components/experiences/experience-list';

const EventDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: event, isLoading, error } = useQuery(['event', id], () => getEventDetails(id), {
        enabled: !!id,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading event details</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-500">Location: {event.location}</p>
            <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleString()}</p>
            <p className="text-sm text-gray-500">Max Participants: {event.maxParticipants}</p>

            <EventParticipants eventId={id} />
            <EventChat eventId={id} />
            <ExperienceList eventId={id} />
        </div>
    );
};

export default EventDetails;