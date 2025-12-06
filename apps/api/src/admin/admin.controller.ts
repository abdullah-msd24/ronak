import { Controller, Get, Delete, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  private checkAdmin(user: any) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }
  }

  @Get('dashboard')
  async getDashboard(@Request() req: any) {
    this.checkAdmin(req.user);
    return this.adminService.getDashboard();
  }

  @Get('users')
  async getAllUsers(@Request() req: any) {
    this.checkAdmin(req.user);
    return this.adminService.getAllUsers();
  }

  @Get('events')
  async getAllEvents(@Request() req: any) {
    this.checkAdmin(req.user);
    return this.adminService.getAllEvents();
  }

  @Get('meetups')
  async getAllMeetups(@Request() req: any) {
    this.checkAdmin(req.user);
    return this.adminService.getAllMeetups();
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string, @Request() req: any) {
    this.checkAdmin(req.user);
    return this.adminService.deleteUser(id, req.user.id);
  }

  @Delete('events/:id')
  async deleteEvent(@Param('id') id: string, @Request() req: any) {
    this.checkAdmin(req.user);
    return this.adminService.deleteEvent(id);
  }

  @Delete('meetups/:id')
  async deleteMeetup(@Param('id') id: string, @Request() req: any) {
    this.checkAdmin(req.user);
    return this.adminService.deleteMeetup(id);
  }
}