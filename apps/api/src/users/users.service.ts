import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: { profile: true },
    });
  }

  async updateProfile(userId: string, data: { firstName?: string; lastName?: string; bio?: string }) {
    return this.prisma.profile.update({
      where: { userId },
      data,
    });
  }
}