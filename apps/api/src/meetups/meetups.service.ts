import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class MeetupsService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, data: { name: string; description: string; category?: string; city?: string }) {
    const meetup = await this.prisma.community.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        city: data.city,
        ownerId,
        members: {
          create: { userId: ownerId, role: 'ADMIN' },
        },
      },
      include: {
        owner: { include: { profile: true } },
        members: { include: { user: { include: { profile: true } } } },
      },
    });
    return meetup;
  }

  async findAll() {
    return this.prisma.community.findMany({
      include: {
        owner: { include: { profile: true } },
        members: { include: { user: { include: { profile: true } } } },
        _count: { select: { members: true } },
      },
    });
  }

  async findById(id: string) {
    const meetup = await this.prisma.community.findUnique({
      where: { id },
      include: {
        owner: { include: { profile: true } },
        members: { include: { user: { include: { profile: true } } } },
      },
    });
    if (!meetup) throw new NotFoundException('Meetup not found');
    return meetup;
  }

  async findMyMeetups(userId: string) {
    return this.prisma.community.findMany({
      where: { ownerId: userId },
      include: {
        owner: { include: { profile: true } },
        members: { include: { user: { include: { profile: true } } } },
      },
    });
  }

  async findJoinedMeetups(userId: string) {
    return this.prisma.community.findMany({
      where: {
        members: { some: { userId } },
      },
      include: {
        owner: { include: { profile: true } },
        members: { include: { user: { include: { profile: true } } } },
      },
    });
  }

  async update(id: string, userId: string, data: { name?: string; description?: string; category?: string; city?: string }) {
    const meetup = await this.findById(id);
    if (meetup.ownerId !== userId) throw new ForbiddenException('Not authorized');
    
    return this.prisma.community.update({
      where: { id },
      data,
      include: {
        owner: { include: { profile: true } },
        members: { include: { user: { include: { profile: true } } } },
      },
    });
  }

  async delete(id: string, userId: string) {
    const meetup = await this.findById(id);
    if (meetup.ownerId !== userId) throw new ForbiddenException('Not authorized');
    
    await this.prisma.communityMember.deleteMany({ where: { communityId: id } });
    return this.prisma.community.delete({ where: { id } });
  }

  async join(meetupId: string, userId: string) {
    const existing = await this.prisma.communityMember.findUnique({
      where: { communityId_userId: { communityId: meetupId, userId } },
    });
    if (existing) return this.findById(meetupId);

    await this.prisma.communityMember.create({
      data: { communityId: meetupId, userId, role: 'MEMBER' },
    });
    return this.findById(meetupId);
  }

  async leave(meetupId: string, userId: string) {
    await this.prisma.communityMember.deleteMany({
      where: { communityId: meetupId, userId },
    });
    return this.findById(meetupId);
  }

  async getEvents(meetupId: string) {
    return this.prisma.event.findMany({
      where: { communityId: meetupId },
      include: {
        host: { include: { profile: true } },
      },
    });
  }
}