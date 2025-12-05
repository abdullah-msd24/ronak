import { useEffect, useState } from 'react';
import { fetchEvents, createEvent, joinEvent, leaveEvent } from '../lib/api';
import { Event } from '../types';

const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleCreateEvent = async (eventData: Omit<Event, 'id'>) => {
    try {
      const newEvent = await createEvent(eventData);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } catch (err) {
      setError('Failed to create event');
    }
  };

  const handleJoinEvent = async (eventId: string) => {
    try {
      await joinEvent(eventId);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, participants: event.participants + 1 } : event
        )
      );
    } catch (err) {
      setError('Failed to join event');
    }
  };

  const handleLeaveEvent = async (eventId: string) => {
    try {
      await leaveEvent(eventId);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, participants: event.participants - 1 } : event
        )
      );
    } catch (err) {
      setError('Failed to leave event');
    }
  };

  return {
    events,
    loading,
    error,
    handleCreateEvent,
    handleJoinEvent,
    handleLeaveEvent,
  };
};

export default useEvents;