export interface User {
  id: string;
  name: string;
  bio?: string;
  age?: number;
  city: string;
  interests: string[];
  profilePhoto: string;
  verificationBadge?: boolean;
  eventHistory: EventHistory[];
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
  hostId: string;
  participants: EventParticipant[];
  experiences: EventExperience[];
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
  rating?: number; // 1 to 5 stars
  createdAt: Date;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: CommunityMember[];
  events: Event[];
}

export interface CommunityMember {
  userId: string;
  communityId: string;
  joinedAt: Date;
}

export interface ChatRoom {
  id: string;
  participants: string[]; // User IDs
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
  reviewerId: string;
  revieweeId: string;
  rating: number; // 1 to 5 stars
  comment?: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  createdAt: Date;
  read: boolean;
}