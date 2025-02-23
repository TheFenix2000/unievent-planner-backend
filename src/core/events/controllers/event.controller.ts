import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { EventDto } from '../dtos/event.dto';
import { CreateEventDto } from '../dtos/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Get()
  async find(): Promise<EventDto[]> {
    return this.eventsService.find();
  }
  @Get(':id')
  async getById(@Param('id') id: string): Promise<EventDto> {
    return this.eventsService.getEventsForId(id);
  }
  @Get(':groupId')
  async getByGroup(@Param('groupId') groupId: string): Promise<EventDto[]> {
    return this.eventsService.getEventsForGroups(groupId);
  }
  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<EventDto> {
    return this.eventsService.create(createEventDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.eventsService.delete(id);
  }
}
