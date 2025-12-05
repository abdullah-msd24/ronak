import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommunityDto: CreateCommunityDto) {
    return this.prisma.community.create({
      data: createCommunityDto,
    });
  }

  async findAll() {
    return this.prisma.community.findMany();
  }

  async findOne(id: number) {
    return this.prisma.community.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return this.prisma.community.update({
      where: { id },
      data: updateCommunityDto,
    });
  }

  async remove(id: number) {
    return this.prisma.community.delete({
      where: { id },
    });
  }
}