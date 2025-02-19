import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemLog } from '../../../models';
import { SystemLogDto } from '../dtos/system-log.dto';
import { CreateSystemLogDto } from '../dtos/create-system-log.dto';
import { UpserDefaultsService } from '../../../upser-defaults/upser-defaults.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SystemLogsService {
  constructor(
    @InjectModel(SystemLog.name) private systemLogModel: Model<SystemLog>,
    private readonly upserDefaultService: UpserDefaultsService,
  ) {}

  async create(createSystemLogDto: CreateSystemLogDto): Promise<SystemLogDto> {
    const user = await this.upserDefaultService.getSystemAccount();

    const newSystemLog = new this.systemLogModel({
      action: createSystemLogDto.action,
      message: createSystemLogDto.message,
      context: createSystemLogDto.context,
      createdBy: user.id,
      updatedBy: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      relatedObjectId: createSystemLogDto.relatedObjectId,
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

  async get(id: string): Promise<SystemLogDto> {
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
