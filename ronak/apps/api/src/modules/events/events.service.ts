import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto, JoinEventDto } from './dto';
import { Event } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  async updateEvent(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async getEventById(id: string): Promise<Event> {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async getAllEvents(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async joinEvent(joinEventDto: JoinEventDto): Promise<Event> {
    const { eventId, userId } = joinEventDto;
    return this.prisma.eventParticipant.create({
      data: {
        event: { connect: { id: eventId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async leaveEvent(eventId: string, userId: string): Promise<void> {
    await this.prisma.eventParticipant.deleteMany({
      where: {
        eventId,
        userId,
      },
    });
  }

  async getEventParticipants(eventId: string): Promise<any[]> {
    return this.prisma.eventParticipant.findMany({
      where: { eventId },
      include: { user: true },
    });
  }

  async getTrendingEvents(city: string): Promise<Event[]> {
    return this.prisma.event.findMany({
      where: { city },
      orderBy: { participants: { _count: 'desc' } },
      take: 5,
    });
  }
}