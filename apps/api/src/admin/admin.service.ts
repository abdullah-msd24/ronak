import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    const [usersCount, eventsCount, meetupsCount] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.event.count(),
      this.prisma.community.count(),
    ]);

    return {
      users: usersCount,
      events: eventsCount,
      meetups: meetupsCount,
    };
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: { profile: true },
    });
  }

  async getAllEvents() {
    return this.prisma.event.findMany({
      include: {
        host: { include: { profile: true } },
      },
    });
  }

  async getAllMeetups() {
    return this.prisma.community.findMany({
      include: {
        owner: { include: { profile: true } },
        _count: { select: { members: true } },
      },
    });
  }

  async deleteUser(id: string, adminId: string) {
    if (id === adminId) throw new ForbiddenException('Cannot delete yourself');
    
    await this.prisma.profile.deleteMany({ where: { userId: id } });
    await this.prisma.eventParticipant.deleteMany({ where: { userId: id } });
    await this.prisma.communityMember.deleteMany({ where: { userId: id } });
    return this.prisma.user.delete({ where: { id } });
  }

  async deleteEvent(id: string) {
    await this.prisma.eventParticipant.deleteMany({ where: { eventId: id } });
    return this.prisma.event.delete({ where: { id } });
  }

  async deleteMeetup(id: string) {
    await this.prisma.communityMember.deleteMany({ where: { communityId: id } });
    return this.prisma.community.delete({ where: { id } });
  }
}