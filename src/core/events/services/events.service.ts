import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../../../models';
import { CreateEventDto } from '../dtos/create-event.dto';
import { plainToClass } from 'class-transformer';
import { UpserDefaultsService } from '../../../upser-defaults/upser-defaults.service';
import { EventDto } from '../dtos/event.dto';
import { UserAccountDto } from '../../../core/accounts/dtos/user-account.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<Event>,
    private upserDefaultsService: UpserDefaultsService,
  ) {}

  async findEvent(): Promise<EventDto[]> {
    const events = await this.eventModel
      .find({ expiresAt: { $gte: new Date() } })
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();

    return events.map((events) =>
      plainToClass(EventDto, events, { excludeExtraneousValues: true }),
    );
  }

  async getEventsForGroups(group: string): Promise<EventDto[]> {
    const events = await this.eventModel
      .find({ groups: { $in: [group] }, expiresAt: { $gte: new Date() } })
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();

    if (!events) {
      throw new NotFoundException('No events found for this group');
    }

    return events.map((events) =>
      plainToClass(EventDto, events, { excludeExtraneousValues: true }),
    );
  }

  async createEvent(createEventDto: CreateEventDto): Promise<EventDto> {
    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();
    const createEventDoc = new this.eventModel();
    createEventDoc.title = createEventDto.title;
    createEventDoc.description = createEventDto.description;
    createEventDoc.startDate = createEventDto.startDate;
    createEventDoc.endDate = createEventDto.endDate;
    createEventDoc.groups = createEventDto.groups;
    createEventDoc.typeModel = createEventDto.eventType;
    // createEventDoc.status = createEventDto.status;
    createEventDoc.createdAt = new Date();
    createEventDoc.updatedAt = new Date();
    createEventDoc.createdBy = user.id;
    createEventDoc.updatedBy = user.id;

    const newEvent = new this.eventModel(createEventDto);
    const result = await newEvent.save();
    return plainToClass(EventDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.eventModel.deleteOne({ _id: id }).exec();
  }
}
