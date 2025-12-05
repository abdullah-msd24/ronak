import { Controller, Get, Delete, Put, Param, Query, UseGuards, Request, ForbiddenException, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  private checkAdmin(req: any) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }
  }

  @Get('dashboard')
  async getDashboard(@Request() req) {
    this.checkAdmin(req);
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  async getUsers(
    @Request() req,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    this.checkAdmin(req);
    return this.adminService.getAllUsers(parseInt(page), parseInt(limit));
  }

  @Get('events')
  async getEvents(
    @Request() req,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    this.checkAdmin(req);
    return this.adminService.getAllEvents(parseInt(page), parseInt(limit));
  }

  @Get('meetups')
  async getMeetups(
    @Request() req,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    this.checkAdmin(req);
    return this.adminService.getAllMeetups(parseInt(page), parseInt(limit));
  }

  @Delete('users/:id')
  async deleteUser(@Request() req, @Param('id') id: string) {
    this.checkAdmin(req);
    return this.adminService.deleteUser(id);
  }

  @Delete('events/:id')
  async deleteEvent(@Request() req, @Param('id') id: string) {
    this.checkAdmin(req);
    return this.adminService.deleteEvent(id);
  }

  @Delete('meetups/:id')
  async deleteMeetup(@Request() req, @Param('id') id: string) {
    this.checkAdmin(req);
    return this.adminService.deleteMeetup(id);
  }

  @Put('users/:id/role')
  async updateUserRole(
    @Request() req,
    @Param('id') id: string,
    @Body('role') role: string,
  ) {
    this.checkAdmin(req);
    return this.adminService.updateUserRole(id, role);
  }
}