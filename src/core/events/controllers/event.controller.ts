import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { EventDto } from '../dtos/event.dto';
import { CreateEventDto } from '../dtos/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Get()
  async find(): Promise<EventDto[]> {
    return this.eventsService.findEvent();
  }
  @Get(':group')
  async get(@Param('group') group: string): Promise<EventDto[]> {
    return this.eventsService.getEventsForGroups(group);
  }
  @Post()
  async create(@Body() newEvent: CreateEventDto): Promise<EventDto> {
    return this.eventsService.createEvent(newEvent);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.eventsService.deleteById(id);
  }
}
