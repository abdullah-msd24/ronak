'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MeetupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [meetup, setMeetup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchMeetup();
  }, [params.id]);

  const fetchMeetup = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/meetups/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setMeetup(data);
      } else {
        setError('Meetup not found');
      }
    } catch (err) {
      setError('Failed to load meetup');
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
      const response = await fetch(`http://localhost:3002/api/meetups/${params.id}/join`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) fetchMeetup();
      else {
        const data = await response.json();
        setError(data.message || 'Failed to join');
      }
    } catch (err) {
      setError('Failed to join meetup');
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setJoining(true);
    try {
      const response = await fetch(`http://localhost:3002/api/meetups/${params.id}/leave`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) fetchMeetup();
    } catch (err) {
      setError('Failed to leave meetup');
    } finally {
      setJoining(false);
    }
  };

  const isMember = meetup?.members?.some((m: any) => m.userId === user?.id);
  const isOrganizer = meetup?.organizerId === user?.id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !meetup) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Meetup not found'}</h1>
          <Link href="/meetups" className="text-blue-500 hover:text-blue-600">← Back to Meetups</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/meetups" className="text-blue-500 hover:text-blue-600 mb-6 inline-block">
          ← Back to Meetups
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cover */}
          <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-6xl">👥</span>
          </div>

          {/* Content */}
          <div className="p-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              {meetup.category || 'Community'}
            </span>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{meetup.name}</h1>

            {/* Organizer */}
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {meetup.organizer?.profile?.firstName?.[0] || 'O'}
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Organized by</p>
                <p className="font-medium text-gray-800">
                  {meetup.organizer?.profile?.firstName} {meetup.organizer?.profile?.lastName}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Members</p>
                  <p className="font-medium text-gray-800">{meetup.members?.length || 0} members</p>
                </div>
              </div>
              {meetup.city && (
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-800">{meetup.city}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About this meetup</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{meetup.description}</p>
            </div>

            {/* Action Buttons */}
            {!isOrganizer && (
              <div>
                {isMember ? (
                  <button
                    onClick={handleLeave}
                    disabled={joining}
                    className="px-8 py-3 border border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 disabled:opacity-50"
                  >
                    {joining ? 'Leaving...' : 'Leave Meetup'}
                  </button>
                ) : (
                  <button
                    onClick={handleJoin}
                    disabled={joining}
                    className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
                  >
                    {joining ? 'Joining...' : 'Join Meetup'}
                  </button>
                )}
              </div>
            )}

            {isOrganizer && (
              <div className="flex gap-4">
                <Link
                  href={`/meetups/${meetup.id}/edit`}
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                >
                  Edit Meetup
                </Link>
                <span className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium">
                  You are organizing this meetup
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}