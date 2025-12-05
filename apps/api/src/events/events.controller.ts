import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateEventDto {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  address?: string;
  city: string;
  country?: string;
  maxParticipants?: number;
  tags?: string[];
  category?: string;
  isOnline?: boolean;
  meetingLink?: string;
  requiresApproval?: boolean;
}

class UpdateEventDto {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  venue?: string;
  address?: string;
  city?: string;
  maxParticipants?: number;
  tags?: string[];
  category?: string;
  isOnline?: boolean;
  meetingLink?: string;
  requiresApproval?: boolean;
  status?: string;
}

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() dto: CreateEventDto) {
    const data = {
      ...dto,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
    };
    return this.eventsService.create(req.user.id, data);
  }

  @Get()
  async findAll(
    @Query('city') city?: string,
    @Query('category') category?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.eventsService.findAll({
      city,
      category,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      search,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  @Get('my-events')
  @UseGuards(JwtAuthGuard)
  async getMyEvents(@Request() req) {
    return this.eventsService.getMyEvents(req.user.id);
  }

  @Get('joined')
  @UseGuards(JwtAuthGuard)
  async getJoinedEvents(@Request() req) {
    return this.eventsService.getJoinedEvents(req.user.id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Request() req, @Body() dto: UpdateEventDto) {
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    return this.eventsService.update(id, req.user.id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Request() req) {
    return this.eventsService.delete(id, req.user.id);
  }

  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  async joinEvent(@Param('id') id: string, @Request() req) {
    return this.eventsService.joinEvent(id, req.user.id);
  }

  @Post(':id/leave')
  @UseGuards(JwtAuthGuard)
  async leaveEvent(@Param('id') id: string, @Request() req) {
    return this.eventsService.leaveEvent(id, req.user.id);
  }
}