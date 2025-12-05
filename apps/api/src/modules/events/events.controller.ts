import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto, JoinEventDto } from './dto';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }

  @Post(':id/join')
  joinEvent(@Param('id') id: string, @Body() joinEventDto: JoinEventDto): Promise<Event> {
    return this.eventsService.joinEvent(id, joinEventDto);
  }

  @Post(':id/leave')
  leaveEvent(@Param('id') id: string): Promise<Event> {
    return this.eventsService.leaveEvent(id);
  }
}