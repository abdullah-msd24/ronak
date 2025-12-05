import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';
import { Community } from '../communities/community.entity';
import { Experience } from '../experiences/experience.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.adminService.getAllUsers();
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteUser(id);
  }

  @Get('events')
  async getAllEvents(): Promise<Event[]> {
    return this.adminService.getAllEvents();
  }

  @Delete('events/:id')
  async deleteEvent(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteEvent(id);
  }

  @Get('communities')
  async getAllCommunities(): Promise<Community[]> {
    return this.adminService.getAllCommunities();
  }

  @Delete('communities/:id')
  async deleteCommunity(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteCommunity(id);
  }

  @Get('experiences')
  async getAllExperiences(): Promise<Experience[]> {
    return this.adminService.getAllExperiences();
  }

  @Delete('experiences/:id')
  async deleteExperience(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteExperience(id);
  }

  @Get('analytics')
  async getAnalytics(): Promise<any> {
    return this.adminService.getAnalytics();
  }
}