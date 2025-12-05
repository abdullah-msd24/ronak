import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExperienceDto: CreateExperienceDto) {
    return this.prisma.eventExperience.create({
      data: createExperienceDto,
    });
  }

  async findAll() {
    return this.prisma.eventExperience.findMany({
      include: {
        user: true,
        event: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.eventExperience.findUnique({
      where: { id },
      include: {
        user: true,
        event: true,
      },
    });
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return this.prisma.eventExperience.update({
      where: { id },
      data: updateExperienceDto,
    });
  }

  async remove(id: number) {
    return this.prisma.eventExperience.delete({
      where: { id },
    });
  }
}