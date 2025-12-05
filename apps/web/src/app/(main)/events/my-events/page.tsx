'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyEventsPage() {
  const router = useRouter();
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('created');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchEvents(token);
  }, []);

  const fetchEvents = async (token: string) => {
    try {
      const [myRes, joinedRes] = await Promise.all([
        fetch('http://localhost:3002/api/events/my-events', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('http://localhost:3002/api/events/joined', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (myRes.ok) {
        const data = await myRes.json();
        setMyEvents(data.events || []);
      }
      if (joinedRes.ok) {
        const data = await joinedRes.json();
        setJoinedEvents(data.events || []);
      }
    } catch (err) {
      console.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const events = activeTab === 'created' ? myEvents : joinedEvents;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <Link
            href="/events/create"
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600"
          >
            Create Event
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('created')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'created'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Events I Created ({myEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'joined'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Events I Joined ({joinedEvents.length})
          </button>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">No events found</p>
            <Link href="/events" className="text-red-500 hover:text-red-600 mt-2 inline-block">
              Browse Events →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-red-400 to-red-600"></div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-red-500 uppercase">
                      {event.category || 'Event'}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">{event.title}</h3>
                    <p className="text-gray-500 text-sm mt-2">
                      {new Date(event.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 text-sm">{event.city}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}