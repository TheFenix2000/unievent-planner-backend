import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Announcement } from 'src/models';
import { Model } from 'mongoose';
import { CreateAnnouncementDto } from '../dtos/create-announcement.dto';
import { AnnouncementDto } from '../dtos';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { UpserDefaultsService } from 'src/upser-defaults/upser-defaults.service';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<Announcement>,
    private upserDefaultsService: UpserDefaultsService,
  ) {}

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<AnnouncementDto> {
    // TODO: add validation of user's username with token and assigne it below
    const createAnnouncementDoc = new this.announcementModel();
    createAnnouncementDoc.title = createAnnouncementDto.title;
    createAnnouncementDoc.description = createAnnouncementDto.description;
    createAnnouncementDoc.important = createAnnouncementDto.important;
    createAnnouncementDoc.createdAt = new Date();
    createAnnouncementDoc.updatedAt = new Date();

    const result = await createAnnouncementDoc.save();
    return plainToClass(AnnouncementDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async find(): Promise<AnnouncementDto[]> {
    const announcements = await this.announcementModel
      .find({ expiresAt: { $gte: new Date() } })
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();

    return announcements.map((el) =>
      plainToClass(AnnouncementDto, el, { excludeExtraneousValues: true }),
    );
  }

  async findById(id: string): Promise<AnnouncementDto> {
    const announcement = await this.announcementModel
      .findById(id)
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();

    if (!announcement) {
      throw new NotFoundException();
    }

    return plainToClass(AnnouncementDto, announcement, {
      excludeExtraneousValues: true,
    });
  }

  async deleteById(id: string): Promise<{ statusCode: number }> {
    // TODO: check with token if user is the owner of announcement
    const announcement = await this.announcementModel
      .findOneAndDelete({ _id: id })
      .exec();

    if (!announcement) {
      throw new NotFoundException();
    }

    return { statusCode: HttpStatus.NO_CONTENT };
  }
}
