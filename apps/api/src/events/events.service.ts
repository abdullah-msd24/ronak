import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { EventStatus, ParticipantStatus } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(hostId: string, data: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    venue: string;
    address?: string;
    city: string;
    country?: string;
    maxParticipants?: number;
    tags?: string[];
    category?: string;
    isOnline?: boolean;
    meetingLink?: string;
    requiresApproval?: boolean;
  }) {
    return this.prisma.event.create({
      data: {
        ...data,
        hostId,
        status: EventStatus.PUBLISHED,
      },
      include: {
        host: {
          include: { profile: true },
        },
        participants: true,
      },
    });
  }

  async findAll(filters: {
    city?: string;
    category?: string;
    startDate?: Date;
    endDate?: Date;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const { city, category, startDate, endDate, search, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      status: EventStatus.PUBLISHED,
    };

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (category) {
      where.category = category;
    }

    if (startDate) {
      where.startDate = { gte: startDate };
    }

    if (endDate) {
      where.endDate = { lte: endDate };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip,
        take: limit,
        include: {
          host: {
            include: { profile: true },
          },
          participants: true,
        },
        orderBy: { startDate: 'asc' },
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        host: {
          include: { profile: true },
        },
        participants: {
          include: {
            user: {
              include: { profile: true },
            },
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Increment view count
    await this.prisma.event.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return event;
  }

  async update(id: string, userId: string, data: {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    venue?: string;
    address?: string;
    city?: string;
    maxParticipants?: number;
    tags?: string[];
    category?: string;
    isOnline?: boolean;
    meetingLink?: string;
    requiresApproval?: boolean;
    status?: EventStatus;
  }) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.hostId !== userId) {
      throw new ForbiddenException('You can only edit your own events');
    }

    return this.prisma.event.update({
      where: { id },
      data,
      include: {
        host: {
          include: { profile: true },
        },
        participants: true,
      },
    });
  }

  async delete(id: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.hostId !== userId) {
      throw new ForbiddenException('You can only delete your own events');
    }

    await this.prisma.event.delete({
      where: { id },
    });

    return { message: 'Event deleted successfully' };
  }

  async joinEvent(eventId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { participants: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Check if already joined
    const existingParticipant = event.participants.find(p => p.userId === userId);
    if (existingParticipant) {
      throw new ForbiddenException('You have already joined this event');
    }

    // Check max participants
    if (event.maxParticipants) {
      const approvedCount = event.participants.filter(
        p => p.status === ParticipantStatus.APPROVED
      ).length;
      if (approvedCount >= event.maxParticipants) {
        throw new ForbiddenException('Event is full');
      }
    }

    const status = event.requiresApproval 
      ? ParticipantStatus.PENDING 
      : ParticipantStatus.APPROVED;

    return this.prisma.eventParticipant.create({
      data: {
        eventId,
        userId,
        status,
      },
      include: {
        event: true,
        user: {
          include: { profile: true },
        },
      },
    });
  }

  async leaveEvent(eventId: string, userId: string) {
    const participant = await this.prisma.eventParticipant.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });

    if (!participant) {
      throw new NotFoundException('You are not a participant of this event');
    }

    await this.prisma.eventParticipant.delete({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });

    return { message: 'Left event successfully' };
  }

  async getMyEvents(userId: string) {
    return this.prisma.event.findMany({
      where: { hostId: userId },
      include: {
        participants: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getJoinedEvents(userId: string) {
    const participants = await this.prisma.eventParticipant.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            host: {
              include: { profile: true },
            },
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });

    return participants.map(p => p.event);
  }
}