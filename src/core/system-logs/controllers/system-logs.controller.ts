import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SystemLogsService } from '../services/system-logs.service';
import { SystemLog } from '../../../models/system-log.model';

@Controller('system-logs')
export class SystemLogsController {
  constructor(private readonly systemLogsService: SystemLogsService) {}

  @Get()
  async find(): Promise<SystemLog[]> {
    return this.systemLogsService.find();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<SystemLog> {
    return this.systemLogsService.findById(id);
  }
}
