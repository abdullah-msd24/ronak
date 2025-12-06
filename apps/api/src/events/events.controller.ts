import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: any, @Body() body: { title: string; description: string; startDate: string; endDate: string; venue: string; city: string; category?: string; maxParticipants?: number }) {
    return this.eventsService.create(req.user.id, body);
  }

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-events')
  async findMyEvents(@Request() req: any) {
    return this.eventsService.findMyEvents(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('joined')
  async findJoinedEvents(@Request() req: any) {
    return this.eventsService.findJoinedEvents(req.user.id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Request() req: any, @Body() body: { title?: string; description?: string; startDate?: string; endDate?: string; venue?: string; city?: string; category?: string }) {
    return this.eventsService.update(id, req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.delete(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  async join(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.join(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/leave')
  async leave(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.leave(id, req.user.id);
  }
}