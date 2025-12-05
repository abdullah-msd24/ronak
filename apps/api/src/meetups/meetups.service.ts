import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class MeetupsService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, data: {
    name: string;
    description?: string;
    city?: string;
    country?: string;
    category?: string;
    tags?: string[];
    isPrivate?: boolean;
  }) {
    const meetup = await this.prisma.community.create({
      data: {
        ...data,
        ownerId,
        memberCount: 1,
      },
      include: {
        owner: {
          include: { profile: true },
        },
      },
    });

    // Add owner as a member
    await this.prisma.communityMember.create({
      data: {
        communityId: meetup.id,
        userId: ownerId,
        role: 'ADMIN',
      },
    });

    return meetup;
  }

  async findAll(filters: {
    city?: string;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const { city, category, search, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [meetups, total] = await Promise.all([
      this.prisma.community.findMany({
        where,
        skip,
        take: limit,
        include: {
          owner: {
            include: { profile: true },
          },
          members: true,
        },
        orderBy: { memberCount: 'desc' },
      }),
      this.prisma.community.count({ where }),
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

  async findById(id: string) {
    const meetup = await this.prisma.community.findUnique({
      where: { id },
      include: {
        owner: {
          include: { profile: true },
        },
        members: {
          include: {
            user: {
              include: { profile: true },
            },
          },
        },
        events: {
          include: {
            host: {
              include: { profile: true },
            },
          },
          orderBy: { startDate: 'asc' },
        },
      },
    });

    if (!meetup) {
      throw new NotFoundException('Meetup not found');
    }

    return meetup;
  }

  async update(id: string, userId: string, data: {
    name?: string;
    description?: string;
    city?: string;
    country?: string;
    category?: string;
    tags?: string[];
    isPrivate?: boolean;
  }) {
    const meetup = await this.prisma.community.findUnique({
      where: { id },
    });

    if (!meetup) {
      throw new NotFoundException('Meetup not found');
    }

    if (meetup.ownerId !== userId) {
      throw new ForbiddenException('You can only edit your own meetups');
    }

    return this.prisma.community.update({
      where: { id },
      data,
      include: {
        owner: {
          include: { profile: true },
        },
        members: true,
      },
    });
  }

  async delete(id: string, userId: string) {
    const meetup = await this.prisma.community.findUnique({
      where: { id },
    });

    if (!meetup) {
      throw new NotFoundException('Meetup not found');
    }

    if (meetup.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own meetups');
    }

    await this.prisma.community.delete({
      where: { id },
    });

    return { message: 'Meetup deleted successfully' };
  }

  async joinMeetup(meetupId: string, userId: string) {
    const meetup = await this.prisma.community.findUnique({
      where: { id: meetupId },
    });

    if (!meetup) {
      throw new NotFoundException('Meetup not found');
    }

    // Check if already a member
    const existingMember = await this.prisma.communityMember.findUnique({
      where: {
        communityId_userId: {
          communityId: meetupId,
          userId,
        },
      },
    });

    if (existingMember) {
      throw new ForbiddenException('You are already a member of this meetup');
    }

    // Add member
    await this.prisma.communityMember.create({
      data: {
        communityId: meetupId,
        userId,
        role: 'MEMBER',
      },
    });

    // Update member count
    await this.prisma.community.update({
      where: { id: meetupId },
      data: { memberCount: { increment: 1 } },
    });

    return { message: 'Joined meetup successfully' };
  }

  async leaveMeetup(meetupId: string, userId: string) {
    const meetup = await this.prisma.community.findUnique({
      where: { id: meetupId },
    });

    if (!meetup) {
      throw new NotFoundException('Meetup not found');
    }

    if (meetup.ownerId === userId) {
      throw new ForbiddenException('Owner cannot leave the meetup');
    }

    const member = await this.prisma.communityMember.findUnique({
      where: {
        communityId_userId: {
          communityId: meetupId,
          userId,
        },
      },
    });

    if (!member) {
      throw new NotFoundException('You are not a member of this meetup');
    }

    await this.prisma.communityMember.delete({
      where: {
        communityId_userId: {
          communityId: meetupId,
          userId,
        },
      },
    });

    // Update member count
    await this.prisma.community.update({
      where: { id: meetupId },
      data: { memberCount: { decrement: 1 } },
    });

    return { message: 'Left meetup successfully' };
  }

  async getMyMeetups(userId: string) {
    return this.prisma.community.findMany({
      where: { ownerId: userId },
      include: {
        members: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getJoinedMeetups(userId: string) {
    const members = await this.prisma.communityMember.findMany({
      where: { userId },
      include: {
        community: {
          include: {
            owner: {
              include: { profile: true },
            },
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });

    return members.map(m => m.community);
  }

  async getMeetupEvents(meetupId: string) {
    const meetup = await this.prisma.community.findUnique({
      where: { id: meetupId },
    });

    if (!meetup) {
      throw new NotFoundException('Meetup not found');
    }

    return this.prisma.event.findMany({
      where: { communityId: meetupId },
      include: {
        host: {
          include: { profile: true },
        },
        participants: true,
      },
      orderBy: { startDate: 'asc' },
    });
  }
}