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
  tags: string[];
  maxParticipants: number;
  banner: string;
  city: string;
  hostId: string;
  participants: EventParticipant[];
  chatId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventParticipant {
  userId: string;
  eventId: string;
  joinedAt: Date;
}

export interface EventExperience {
  id: string;
  eventId: string;
  userId: string;
  title: string;
  details: string;
  rating: number | null;
  createdAt: Date;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: CommunityMember[];
  events: Event[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityMember {
  userId: string;
  communityId: string;
  joinedAt: Date;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  createdAt: Date;
}

export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  hostId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}