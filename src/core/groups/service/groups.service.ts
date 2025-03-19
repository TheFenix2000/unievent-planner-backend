import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateJoinCodeDto } from '../../../core/join-codes/dtos/create-join-code.dto';
import { CodesService } from '../../../core/join-codes/service/code.service';
import { SystemStatus } from '../../../libs';
import { toObjectId } from '../../../libs/shared/utils/service.utils';
import { Group } from '../../../models';
import { UpserDefaultsService } from '../../../upser-defaults/upser-defaults.service';
import { UserAccountDto } from '../../accounts/dtos/user-account.dto';
import { RoleDto } from '../../roles/dtos/role.dto';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { GroupDto } from '../dtos/group.dto';
@Injectable()
export class GroupsService {
  constructor(
    private readonly upserDefaultsService: UpserDefaultsService,
    private readonly codeService: CodesService,
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<GroupDto> {
    const createGroupDoc = new this.groupModel();

    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();
    createGroupDoc.president = user.id;
    createGroupDoc.updatedAt = new Date();
    createGroupDoc.createdAt = new Date();
    createGroupDoc.updatedBy = user.id;
    createGroupDoc.createdBy = user.id;
    createGroupDoc.name = createGroupDto.name;
    createGroupDoc.courseName = createGroupDto.courseName;
    createGroupDoc.description = createGroupDto.description;
    createGroupDoc.avatarUrl = createGroupDto.avatarUrl;

    const result = await createGroupDoc;

    const temporaryRole: RoleDto = {
      id: '67a084ce81514c83dee6e2a4', // Fake ID for a temporary role
      name: 'Temporary Member',
      permissions: [],
      status: SystemStatus.ACTIVE,
      updatedAt: new Date(),
      createdAt: new Date(),
      updatedBy: user,
      createdBy: user,
    };

    const joinCodeDto: CreateJoinCodeDto = {
      role: temporaryRole.id, // Define the role (adjust as needed)
      group: result.id,
      usesLeft: 1,
      code: this.codeService.code,
    };
    const joinCode = await this.codeService.create(joinCodeDto);

    result.joinCodes = joinCode.id;
    await result.save();

    return plainToClass(GroupDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async get(id: string): Promise<GroupDto> {
    const group = await this.groupModel
      .findById(id)
      .populate('members')
      .populate('joinCodes')
      .lean()
      .exec();
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return plainToClass(GroupDto, group, {
      excludeExtraneousValues: true,
    });
  }

  async find(): Promise<GroupDto[]> {
    const groups = await this.groupModel
      .find()
      .populate('members')
      .populate('joinCodes')
      .lean()
      .exec();
    return groups.map((currentElement) =>
      plainToClass(GroupDto, currentElement, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async remove(id: string): Promise<void> {
    const objectId = toObjectId(id);
    await this.groupModel.findOneAndDelete(objectId).exec();
  }
}
