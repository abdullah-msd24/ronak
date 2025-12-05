import { Controller, Get, Put, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  city?: string;
  country?: string;
  dateOfBirth?: string;
  gender?: string;
  interests?: string[];
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Request() req, @Body() dto: UpdateProfileDto) {
    const data: any = { ...dto };
    if (dto.dateOfBirth) {
      data.dateOfBirth = new Date(dto.dateOfBirth);
    }
    return this.usersService.updateProfile(req.user.id, data);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.usersService.getAllUsers(parseInt(page), parseInt(limit));
  }
}