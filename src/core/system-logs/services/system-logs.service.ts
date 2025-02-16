import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemLog } from 'src/models';
import { SystemLogDto } from '../dtos/system-log.dto';
import { UpserDefaultsService } from 'src/upser-defaults/upser-defaults.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SystemLogsService {
  constructor(
    @InjectModel(SystemLog.name) private systemLogModel: Model<SystemLog>,
    private readonly upserDefaultService: UpserDefaultsService,
  ) {}

  async createSystemLog(systemLogDto: SystemLogDto): Promise<SystemLogDto> {
    const user = await this.upserDefaultService.getSystemAccount();

    const newSystemLog = new this.systemLogModel({
      action: systemLogDto.action,
      message: systemLogDto.message,
      context: systemLogDto.context,
      createdBy: user.id,
      updatedBy: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      relatedObjectId: systemLogDto.relatedObjectId,
    });

    const result = await newSystemLog.save();
    return plainToClass(SystemLogDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async find(): Promise<SystemLogDto[]> {
    const systemLogs = await this.systemLogModel
      .find()
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();
    return systemLogs.map((systemLog) =>
      plainToClass(SystemLogDto, systemLog, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findById(id: string): Promise<SystemLogDto> {
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
