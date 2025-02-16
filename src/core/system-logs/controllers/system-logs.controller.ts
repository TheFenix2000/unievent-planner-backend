import { Controller, Get, Param } from '@nestjs/common';
import { SystemLogsService } from '../services/system-logs.service';
import { SystemLogDto } from '../dtos/system-log.dto';

@Controller('system-logs')
export class SystemLogsController {
  constructor(private readonly systemLogsService: SystemLogsService) {}

  @Get()
  async find(): Promise<SystemLogDto[]> {
    return this.systemLogsService.find();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<SystemLogDto> {
    return this.systemLogsService.findById(id);
  }
}
