import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemLog } from '../../../models/system-log.model';
import { SystemLogDto } from '../dtos/system-log.dto';
import { UpserDefaultsService } from '../../../upser-defaults/upser-defaults.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SystemLogsService {
  constructor(
    @InjectModel(SystemLog.name) private systemLogModel: Model<SystemLog>,
    private readonly upserDefaultService: UpserDefaultsService,
  ) {}

  async createSystemLog(systemLogDto: SystemLogDto): Promise<SystemLog> {
    const user = await this.upserDefaultService.getSystemAccount();

    const newSystemLog = new this.systemLogModel({
      action: systemLogDto.action,
      message: systemLogDto.message,
      context: systemLogDto.context,
      createdBy: user.id,
      updatedBy: user.id,
      createdAt: systemLogDto.createdAt,
      updatedAt: systemLogDto.updatedAt,
      relatedObjectId: systemLogDto.relatedObjectId,
    });

    const result = await newSystemLog.save();
    return plainToClass(SystemLogDto, result, {
      excludeExtraneousValues: true,
    });
  }

  // system-logs.service.ts
  async find(): Promise<SystemLog[]> {
    const systemLogs = await this.systemLogModel
      .find()
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();
    return plainToClass(SystemLogDto, systemLogs, {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: string): Promise<SystemLog> {
    const systemLog = await this.systemLogModel
      .findById(id)
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();

    if (!systemLog) {
      throw new NotFoundException(`SystemLog with id ${id} not found`);
    }

    return plainToClass(SystemLogDto, systemLog, {
      excludeExtraneousValues: true,
    });
  }
}
