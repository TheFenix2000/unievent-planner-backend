import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { WinstonLogger } from 'src/libs/internal/winston.logger';
import { UpserDefaultsService } from 'src/upser-defaults/upser-defaults.service';
import { UserAccount, Group, Announcement, Event } from 'src/models';
import { UserAccountDto } from 'src/core/accounts/dtos';
import { GroupDto } from 'src/core/groups/dtos/group.dto';
import { AnnouncementDto } from 'src/core/announcements/dtos';
import { EventDto } from 'src/core/events/dtos/event.dto';
import {
  MOCK_USER_ACCOUNT,
  MOCK_GROUP,
  MOCK_ANNOUNCEMENT,
  MOCK_EVENT,
  updateMockDataWithSystemAccountId,
} from '../mock-data/mock-data.constants';

@Injectable()
export class MockDataService {
  constructor(
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>,
    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
    @InjectModel(Announcement.name)
    private readonly announcementModel: Model<Announcement>,
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,
    private readonly upserDefaultsService: UpserDefaultsService,
  ) {}

  async initializeMockData(): Promise<void> {
    try {
      WinstonLogger.info('Checking and adding mock data if needed');

      const user = await this.upserDefaultsService.getSystemAccount();
      updateMockDataWithSystemAccountId(user.id);

      await Promise.all([
        this.checkAndAddMockUserAccount(),
        this.checkAndAddMockGroup(),
        this.checkAndAddMockAnnouncement(),
        this.checkAndAddMockEvent(),
      ]);

      WinstonLogger.info('Mock data initialization completed');
    } catch (error) {
      WinstonLogger.error('Error initializing mock data', error);
    }
  }

  async checkAndAddMockUserAccount(): Promise<void> {
    try {
      const userAccountCount = await this.userAccountModel
        .countDocuments()
        .exec();
      if (userAccountCount === 1) {
        WinstonLogger.info(
          'No user accounts other than system found, adding mock data',
        );
        await this.createMockUserAccount();
        WinstonLogger.info('Mock user account added');
      } else {
        WinstonLogger.info(
          `Found ${userAccountCount} user accounts in the database`,
        );
      }
    } catch (error) {
      WinstonLogger.error('Error checking or adding mock user account', error);
    }
  }

  async checkAndAddMockGroup(): Promise<void> {
    try {
      const groupCount = await this.groupModel.countDocuments().exec();
      if (groupCount === 0) {
        WinstonLogger.info('No groups found, adding mock data');
        await this.createMockGroup();
        WinstonLogger.info('Mock group added');
      } else {
        WinstonLogger.info(`Found ${groupCount} groups in the database`);
      }
    } catch (error) {
      WinstonLogger.error('Error checking or adding mock group', error);
    }
  }

  async checkAndAddMockAnnouncement(): Promise<void> {
    try {
      const announcementCount = await this.announcementModel
        .countDocuments()
        .exec();
      if (announcementCount === 0) {
        WinstonLogger.info('No announcements found, adding mock data');
        await this.createMockAnnouncement();
        WinstonLogger.info('Mock announcement added');
      } else {
        WinstonLogger.info(
          `Found ${announcementCount} announcements in the database`,
        );
      }
    } catch (error) {
      WinstonLogger.error('Error checking or adding mock announcement', error);
    }
  }

  async checkAndAddMockEvent(): Promise<void> {
    try {
      const eventCount = await this.eventModel.countDocuments().exec();
      if (eventCount === 0) {
        WinstonLogger.info('No events found, adding mock data');
        await this.createMockEvent();
        WinstonLogger.info('Mock event added');
      } else {
        WinstonLogger.info(`Found ${eventCount} events in the database`);
      }
    } catch (error) {
      WinstonLogger.error('Error checking or adding mock event', error);
    }
  }

  private async createMockUserAccount(): Promise<UserAccountDto> {
    const createUserAccountDoc = new this.userAccountModel();

    createUserAccountDoc.email = MOCK_USER_ACCOUNT.email;
    createUserAccountDoc.username = MOCK_USER_ACCOUNT.username;
    createUserAccountDoc.firstName = MOCK_USER_ACCOUNT.firstName;
    createUserAccountDoc.lastName = MOCK_USER_ACCOUNT.lastName;
    createUserAccountDoc.groups = MOCK_USER_ACCOUNT.groups;
    createUserAccountDoc.role = MOCK_USER_ACCOUNT.role;
    createUserAccountDoc.createdBy = MOCK_USER_ACCOUNT.createdBy;
    createUserAccountDoc.updatedBy = MOCK_USER_ACCOUNT.updatedBy;
    createUserAccountDoc.createdAt = new Date();
    createUserAccountDoc.updatedAt = new Date();

    const result = await createUserAccountDoc.save();
    return plainToClass(UserAccountDto, result, {
      excludeExtraneousValues: true,
    });
  }

  private async createMockGroup(): Promise<GroupDto> {
    const createGroupDoc = new this.groupModel();

    createGroupDoc.name = MOCK_GROUP.name;
    createGroupDoc.courseName = MOCK_GROUP.courseName;
    createGroupDoc.description = MOCK_GROUP.description;
    createGroupDoc.avatarUrl = MOCK_GROUP.avatarUrl;
    createGroupDoc.president = MOCK_GROUP.president;
    createGroupDoc.joinCodes = MOCK_GROUP.joinCodes;
    createGroupDoc.createdBy = MOCK_GROUP.createdBy;
    createGroupDoc.updatedBy = MOCK_GROUP.updatedBy;
    createGroupDoc.createdAt = new Date();
    createGroupDoc.updatedAt = new Date();

    const result = await createGroupDoc.save();
    return plainToClass(GroupDto, result, {
      excludeExtraneousValues: true,
    });
  }

  private async createMockAnnouncement(): Promise<AnnouncementDto> {
    const createAnnouncementDoc = new this.announcementModel();

    createAnnouncementDoc.title = MOCK_ANNOUNCEMENT.title;
    createAnnouncementDoc.description = MOCK_ANNOUNCEMENT.description;
    createAnnouncementDoc.important = MOCK_ANNOUNCEMENT.important;
    createAnnouncementDoc.createdBy = MOCK_ANNOUNCEMENT.createdBy;
    createAnnouncementDoc.updatedBy = MOCK_ANNOUNCEMENT.updatedBy;
    createAnnouncementDoc.createdAt = new Date();
    createAnnouncementDoc.updatedAt = new Date();

    const result = await createAnnouncementDoc.save();
    return plainToClass(AnnouncementDto, result, {
      excludeExtraneousValues: true,
    });
  }

  private async createMockEvent(): Promise<EventDto> {
    const createEventDoc = new this.eventModel();

    createEventDoc.title = MOCK_EVENT.title;
    createEventDoc.description = MOCK_EVENT.description;
    createEventDoc.startDate = MOCK_EVENT.startDate;
    createEventDoc.endDate = MOCK_EVENT.endDate;
    createEventDoc.groups = MOCK_EVENT.groups;
    createEventDoc.typeModel = MOCK_EVENT.typeModel;
    createEventDoc.createdBy = MOCK_EVENT.createdBy;
    createEventDoc.updatedBy = MOCK_EVENT.updatedBy;
    createEventDoc.createdAt = new Date();
    createEventDoc.updatedAt = new Date();

    const result = await createEventDoc.save();
    return plainToClass(EventDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
