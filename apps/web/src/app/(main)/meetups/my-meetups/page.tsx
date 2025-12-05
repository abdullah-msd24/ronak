'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyMeetupsPage() {
  const router = useRouter();
  const [myMeetups, setMyMeetups] = useState<any[]>([]);
  const [joinedMeetups, setJoinedMeetups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('created');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchMeetups(token);
  }, []);

  const fetchMeetups = async (token: string) => {
    try {
      const [myRes, joinedRes] = await Promise.all([
        fetch('http://localhost:3002/api/meetups/my-meetups', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('http://localhost:3002/api/meetups/joined', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (myRes.ok) {
        const data = await myRes.json();
        setMyMeetups(data.meetups || []);
      }
      if (joinedRes.ok) {
        const data = await joinedRes.json();
        setJoinedMeetups(data.meetups || []);
      }
    } catch (err) {
      console.error('Failed to fetch meetups');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const meetups = activeTab === 'created' ? myMeetups : joinedMeetups;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Meetups</h1>
          <Link
            href="/meetups/create"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
          >
            Create Meetup
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('created')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'created'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Meetups I Created ({myMeetups.length})
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'joined'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Meetups I Joined ({joinedMeetups.length})
          </button>
        </div>

        {/* Meetups Grid */}
        {meetups.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">No meetups found</p>
            <Link href="/meetups" className="text-blue-500 hover:text-blue-600 mt-2 inline-block">
              Browse Meetups →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetups.map((meetup) => (
              <Link key={meetup.id} href={`/meetups/${meetup.id}`}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-blue-500 uppercase">
                      {meetup.category || 'Community'}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">{meetup.name}</h3>
                    <p className="text-gray-500 text-sm mt-2">
                      {meetup.members?.length || 0} members
                    </p>
                    {meetup.city && <p className="text-gray-500 text-sm">{meetup.city}</p>}
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