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

  async find(): Promise<EventDto[]> {
    const events = await this.eventModel
      .find({ endDate: { $gte: new Date() } })
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();

    return events.map((events) =>
      plainToClass(EventDto, events, { excludeExtraneousValues: true }),
    );
  }

  async getEventsForGroups(groupId: string): Promise<EventDto[]> {
    const events = await this.eventModel
      .find({ groups: { $in: [groupId] }, endDate: { $gte: new Date() } })
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();

    return events.map((events) =>
      plainToClass(EventDto, events, { excludeExtraneousValues: true }),
    );
  }
  async getEventsForId(id: string): Promise<EventDto> {
    const events = await this.eventModel
      .find({ id: { $in: [id] }, endDate: { $gte: new Date() } })
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();

    if (!events) {
      throw new NotFoundException('No events found with this id');
    }
    return plainToClass(EventDto, events[0], { excludeExtraneousValues: true });
  }

  async create(createEventDto: CreateEventDto): Promise<EventDto> {
    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();
    const createEventDoc = new this.eventModel();
    createEventDoc.title = createEventDto.title;
    createEventDoc.description = createEventDto.description;
    createEventDoc.startDate = createEventDto.startDate;
    createEventDoc.endDate = createEventDto.endDate;
    createEventDoc.groups = createEventDto.groups;
    createEventDoc.typeModel = createEventDto.eventType;
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
  async delete(id: string): Promise<void> {
    const events = await this.eventModel
      .find({ id: { $in: [id] }, endDate: { $gte: new Date() } })
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();
    if (events.length === 0) {
      throw new NotFoundException('No events found with this id to delete');
    } else {
      await this.eventModel.deleteOne({ _id: id }).exec();
    }
  }
}
