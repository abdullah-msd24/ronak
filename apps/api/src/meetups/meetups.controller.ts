import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateMeetupDto {
  name: string;
  description?: string;
  city?: string;
  country?: string;
  category?: string;
  tags?: string[];
  isPrivate?: boolean;
}

class UpdateMeetupDto {
  name?: string;
  description?: string;
  city?: string;
  country?: string;
  category?: string;
  tags?: string[];
  isPrivate?: boolean;
}

@Controller('meetups')
export class MeetupsController {
  constructor(private meetupsService: MeetupsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() dto: CreateMeetupDto) {
    return this.meetupsService.create(req.user.id, dto);
  }

  @Get()
  async findAll(
    @Query('city') city?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.meetupsService.findAll({
      city,
      category,
      search,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  @Get('my-meetups')
  @UseGuards(JwtAuthGuard)
  async getMyMeetups(@Request() req) {
    return this.meetupsService.getMyMeetups(req.user.id);
  }

  @Get('joined')
  @UseGuards(JwtAuthGuard)
  async getJoinedMeetups(@Request() req) {
    return this.meetupsService.getJoinedMeetups(req.user.id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.meetupsService.findById(id);
  }

  @Get(':id/events')
  async getMeetupEvents(@Param('id') id: string) {
    return this.meetupsService.getMeetupEvents(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Request() req, @Body() dto: UpdateMeetupDto) {
    return this.meetupsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Request() req) {
    return this.meetupsService.delete(id, req.user.id);
  }

  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  async joinMeetup(@Param('id') id: string, @Request() req) {
    return this.meetupsService.joinMeetup(id, req.user.id);
  }

  @Post(':id/leave')
  @UseGuards(JwtAuthGuard)
  async leaveMeetup(@Param('id') id: string, @Request() req) {
    return this.meetupsService.leaveMeetup(id, req.user.id);
  }
}