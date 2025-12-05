'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchEvent();
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/events/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      } else {
        setError('Event not found');
      }
    } catch (err) {
      setError('Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    setJoining(true);
    try {
      const response = await fetch(`http://localhost:3002/api/events/${params.id}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchEvent();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to join event');
      }
    } catch (err) {
      setError('Failed to join event');
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setJoining(true);
    try {
      const response = await fetch(`http://localhost:3002/api/events/${params.id}/leave`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchEvent();
      }
    } catch (err) {
      setError('Failed to leave event');
    } finally {
      setJoining(false);
    }
  };

  const isParticipant = event?.participants?.some((p: any) => p.userId === user?.id);
  const isHost = event?.hostId === user?.id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Event not found'}</h1>
          <Link href="/events" className="text-red-500 hover:text-red-600">
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/events" className="text-red-500 hover:text-red-600 mb-6 inline-block">
          ← Back to Events
        </Link>

        {/* Event Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-64 bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center">
            <span className="text-6xl">🎉</span>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Category */}
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
              {event.category || 'Event'}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>

            {/* Host */}
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                {event.host?.profile?.firstName?.[0] || 'H'}
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Hosted by</p>
                <p className="font-medium text-gray-800">
                  {event.host?.profile?.firstName} {event.host?.profile?.lastName}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-gray-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium text-gray-800">
                    {new Date(event.startDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600">
                    {new Date(event.startDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-gray-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">{event.venue}</p>
                  <p className="text-gray-600">{event.city}</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-gray-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="font-medium text-gray-800">
                    {event.participants?.length || 0}
                    {event.maxParticipants ? ` / ${event.maxParticipants}` : ''} going
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About this event</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
            </div>

            {/* Action Button */}
            {!isHost && (
              <div>
                {isParticipant ? (
                  <button
                    onClick={handleLeave}
                    disabled={joining}
                    className="w-full md:w-auto px-8 py-3 border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition disabled:opacity-50"
                  >
                    {joining ? 'Leaving...' : 'Leave Event'}
                  </button>
                ) : (
                  <button
                    onClick={handleJoin}
                    disabled={joining}
                    className="w-full md:w-auto px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
                  >
                    {joining ? 'Joining...' : 'Join Event'}
                  </button>
                )}
              </div>
            )}

            {isHost && (
              <div className="flex gap-4">
                <Link
                  href={`/events/${event.id}/edit`}
                  className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Edit Event
                </Link>
                <span className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium">
                  You are hosting this event
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}