import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalEvents,
      totalMeetups,
      recentUsers,
      recentEvents,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.event.count(),
      this.prisma.community.count(),
      this.prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { profile: true },
      }),
      this.prisma.event.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          host: { include: { profile: true } },
        },
      }),
    ]);

    return {
      stats: {
        totalUsers,
        totalEvents,
        totalMeetups,
      },
      recentUsers,
      recentEvents,
    };
  }

  async getAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        include: { profile: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAllEvents(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        skip,
        take: limit,
        include: {
          host: { include: { profile: true } },
          participants: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.event.count(),
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

  async getAllMeetups(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [meetups, total] = await Promise.all([
      this.prisma.community.findMany({
        skip,
        take: limit,
        include: {
          owner: { include: { profile: true } },
          members: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.community.count(),
    ]);

    return {
      meetups,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteUser(userId: string) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
    return { message: 'User deleted successfully' };
  }

  async deleteEvent(eventId: string) {
    await this.prisma.event.delete({
      where: { id: eventId },
    });
    return { message: 'Event deleted successfully' };
  }

  async deleteMeetup(meetupId: string) {
    await this.prisma.community.delete({
      where: { id: meetupId },
    });
    return { message: 'Meetup deleted successfully' };
  }

  async updateUserRole(userId: string, role: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: role as any },
      include: { profile: true },
    });
  }
}