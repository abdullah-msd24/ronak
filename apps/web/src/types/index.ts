export interface User {
  id: string;
  name: string;
  bio: string;
  age: number;
  city: string;
  interests: string[];
  profilePhoto: string;
  verificationBadge: boolean;
  eventHistory: Event[];
  experiences: EventExperience[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  maxParticipants: number;
  tags: string[];
  participants: User[];
  hostId: string;
  isApproved: boolean;
}

export interface EventExperience {
  id: string;
  eventId: string;
  userId: string;
  title: string;
  details: string;
  rating?: number; // Optional rating from 1 to 5
  createdAt: Date;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: User[];
  events: Event[];
}

export interface Review {
  id: string;
  userId: string;
  hostId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ChatRoom {
  id: string;
  participants: User[];
  messages: Message[];
}

export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}