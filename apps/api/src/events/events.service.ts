import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(hostId: string, data: { title: string; description: string; startDate: string; endDate: string; venue: string; city: string; category?: string; maxParticipants?: number }) {
    return this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        venue: data.venue,
        city: data.city,
        category: data.category,
        maxParticipants: data.maxParticipants || 100,
        status: 'PUBLISHED',
        hostId,
      },
      include: {
        host: { include: { profile: true } },
        participants: { include: { user: { include: { profile: true } } } },
      },
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        host: { include: { profile: true } },
        participants: { include: { user: { include: { profile: true } } } },
      },
      orderBy: { startDate: 'asc' },
    });
  }

  async findById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        host: { include: { profile: true } },
        participants: { include: { user: { include: { profile: true } } } },
      },
    });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async findMyEvents(userId: string) {
    return this.prisma.event.findMany({
      where: { hostId: userId },
      include: {
        host: { include: { profile: true } },
        participants: { include: { user: { include: { profile: true } } } },
      },
    });
  }

  async findJoinedEvents(userId: string) {
    return this.prisma.event.findMany({
      where: {
        participants: { some: { userId } },
      },
      include: {
        host: { include: { profile: true } },
        participants: { include: { user: { include: { profile: true } } } },
      },
    });
  }

  async update(id: string, userId: string, data: { title?: string; description?: string; startDate?: string; endDate?: string; venue?: string; city?: string; category?: string }) {
    const event = await this.findById(id);
    if (event.hostId !== userId) throw new ForbiddenException('Not authorized');
    
    return this.prisma.event.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        venue: data.venue,
        city: data.city,
        category: data.category,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
      include: {
        host: { include: { profile: true } },
        participants: { include: { user: { include: { profile: true } } } },
      },
    });
  }

  async delete(id: string, userId: string) {
    const event = await this.findById(id);
    if (event.hostId !== userId) throw new ForbiddenException('Not authorized');
    
    await this.prisma.eventParticipant.deleteMany({ where: { eventId: id } });
    return this.prisma.event.delete({ where: { id } });
  }

  async join(eventId: string, userId: string) {
    const existing = await this.prisma.eventParticipant.findUnique({
      where: { eventId_userId: { eventId, userId } },
    });
    if (existing) return this.findById(eventId);

    await this.prisma.eventParticipant.create({
      data: { eventId, userId, status: 'APPROVED' },
    });
    return this.findById(eventId);
  }

  async leave(eventId: string, userId: string) {
    await this.prisma.eventParticipant.deleteMany({
      where: { eventId, userId },
    });
    return this.findById(eventId);
  }
}