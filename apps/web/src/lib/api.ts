import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (data: any) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

// Users
export const getRecommendedUsers = async () => {
  const response = await api.get('/users/recommended');
  return response.data;
};

export const getUserProfile = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Events
export const fetchEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

export const getEventById = async (eventId: string) => {
  const response = await api.get(`/events/${eventId}`);
  return response.data;
};

export const createEvent = async (data: any) => {
  const response = await api.post('/events', data);
  return response.data;
};

export const joinEvent = async (eventId: string) => {
  const response = await api.post(`/events/${eventId}/join`);
  return response.data;
};

export const leaveEvent = async (eventId: string) => {
  const response = await api.post(`/events/${eventId}/leave`);
  return response.data;
};

// Communities
export const fetchCommunities = async () => {
  const response = await api.get('/communities');
  return response.data;
};

export const getCommunityById = async (communityId: string) => {
  const response = await api.get(`/communities/${communityId}`);
  return response.data;
};

export const createCommunity = async (data: any) => {
  const response = await api.post('/communities', data);
  return response.data;
};

// Experiences
export const fetchExperiences = async () => {
  const response = await api.get('/experiences');
  return response.data;
};

export const getExperienceById = async (experienceId: string) => {
  const response = await api.get(`/experiences/${experienceId}`);
  return response.data;
};

export const createExperience = async (data: any) => {
  const response = await api.post('/experiences', data);
  return response.data;
};

// Chat
export const getChatRooms = async () => {
  const response = await api.get('/chat/rooms');
  return response.data;
};

export const getMessages = async (roomId: string) => {
  const response = await api.get(`/chat/rooms/${roomId}/messages`);
  return response.data;
};

export default api;