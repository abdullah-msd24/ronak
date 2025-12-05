'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, events: 0, meetups: 0 });
  const [users, setUsers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [meetups, setMeetups] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    fetchData(token);
  }, []);

  const fetchData = async (token: string) => {
    try {
      const [usersRes, eventsRes, meetupsRes] = await Promise.all([
        fetch('http://localhost:3002/api/admin/users', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:3002/api/admin/events', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:3002/api/admin/meetups', { headers: { 'Authorization': `Bearer ${token}` } }),
      ]);

      if (usersRes.ok) {
        const data = await usersRes.json();
        const usersArray = Array.isArray(data) ? data : (data.users || []);
        setUsers(usersArray);
        setStats(prev => ({ ...prev, users: usersArray.length }));
      }
      if (eventsRes.ok) {
        const data = await eventsRes.json();
        const eventsArray = Array.isArray(data) ? data : (data.events || []);
        setEvents(eventsArray);
        setStats(prev => ({ ...prev, events: eventsArray.length }));
      }
      if (meetupsRes.ok) {
        const data = await meetupsRes.json();
        const meetupsArray = Array.isArray(data) ? data : (data.meetups || []);
        setMeetups(meetupsArray);
        setStats(prev => ({ ...prev, meetups: meetupsArray.length }));
      }
    } catch (err) {
      console.error('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3002/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
        setStats(prev => ({ ...prev, users: prev.users - 1 }));
      }
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3002/api/admin/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        setEvents(events.filter(e => e.id !== id));
        setStats(prev => ({ ...prev, events: prev.events - 1 }));
      }
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  const deleteMeetup = async (id: string) => {
    if (!confirm('Are you sure you want to delete this meetup?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3002/api/admin/meetups/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        setMeetups(meetups.filter(m => m.id !== id));
        setStats(prev => ({ ...prev, meetups: prev.meetups - 1 }));
      }
    } catch (err) {
      alert('Failed to delete meetup');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{stats.events}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Meetups</p>
                <p className="text-2xl font-bold text-gray-900">{stats.meetups}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'users', 'events', 'meetups'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome, Admin!</h2>
                <p className="text-gray-600">Use the tabs above to manage users, events, and meetups.</p>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                {users.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No users found</p>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">User</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">
                                {u.profile?.firstName?.[0] || u.email?.[0]?.toUpperCase() || 'U'}
                              </div>
                              <span className="ml-3 font-medium">
                                {u.profile?.firstName || ''} {u.profile?.lastName || ''}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              u.role === 'ADMIN' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {u.id !== user?.id && (
                              <button
                                onClick={() => deleteUser(u.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'events' && (
              <div className="overflow-x-auto">
                {events.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No events found</p>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Event</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Host</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {events.map((e) => (
                        <tr key={e.id}>
                          <td className="px-4 py-3 font-medium">{e.title}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {e.host?.profile?.firstName || ''} {e.host?.profile?.lastName || ''}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {e.startDate ? new Date(e.startDate).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => deleteEvent(e.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'meetups' && (
              <div className="overflow-x-auto">
                {meetups.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No meetups found</p>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Meetup</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Organizer</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Members</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {meetups.map((m) => (
                        <tr key={m.id}>
                          <td className="px-4 py-3 font-medium">{m.name}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {m.organizer?.profile?.firstName || ''} {m.organizer?.profile?.lastName || ''}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{m.members?.length || m._count?.members || 0}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => deleteMeetup(m.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}