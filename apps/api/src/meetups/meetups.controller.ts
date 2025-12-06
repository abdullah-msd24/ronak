import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/meetups')
export class MeetupsController {
  constructor(private meetupsService: MeetupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: any, @Body() body: { name: string; description: string; category?: string; city?: string }) {
    return this.meetupsService.create(req.user.id, body);
  }

  @Get()
  async findAll() {
    return this.meetupsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-meetups')
  async findMyMeetups(@Request() req: any) {
    return this.meetupsService.findMyMeetups(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('joined')
  async findJoinedMeetups(@Request() req: any) {
    return this.meetupsService.findJoinedMeetups(req.user.id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.meetupsService.findById(id);
  }

  @Get(':id/events')
  async getEvents(@Param('id') id: string) {
    return this.meetupsService.getEvents(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Request() req: any, @Body() body: { name?: string; description?: string; category?: string; city?: string }) {
    return this.meetupsService.update(id, req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.meetupsService.delete(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  async join(@Param('id') id: string, @Request() req: any) {
    return this.meetupsService.join(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/leave')
  async leave(@Param('id') id: string, @Request() req: any) {
    return this.meetupsService.leave(id, req.user.id);
  }
}