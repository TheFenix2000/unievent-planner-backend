import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { randomBytes } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from 'src/models';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { GroupDto } from '../dtos/group.dto';
@Injectable()
export class GroupsService {
  @InjectModel(Group.name) private readonly GroupModel: Model<Group>;

  // private generateCode(length: number = 6): string {
  //   return randomBytes(length)
  //     .toString('base64')
  //     .replace(/[^a-zA-Z0-9]/g, '')
  //     .substring(0, length);
  // }

  async createGroup(createGroupDto: CreateGroupDto): Promise<CreateGroupDto> {
    const createGroupDoc = new this.GroupModel();
    //TODO: change it
    createGroupDoc.president = '647c5917-2ed2-4e9d-85e9-ac596e0248e2';
    createGroupDoc.updatedAt = new Date();
    createGroupDoc.createdAt = new Date();
    createGroupDoc.updatedBy = '647c5917-2ed2-4e9d-85e9-ac596e0248e2';
    createGroupDoc.createdBy = '647c5917-2ed2-4e9d-85e9-ac596e0248e2';
    //
    createGroupDoc.name = createGroupDto.name;
    createGroupDoc.courseName = createGroupDto.courseName;
    createGroupDoc.description = createGroupDto.description;
    createGroupDoc.avatarUrl = createGroupDto.avatarUrl;
    // todo: change it
    createGroupDoc.joinCodes = ['d656f6b5-e852-4387-967a-02ead4b5b009'];
    //
    return createGroupDoc.save();
  }

  async getGroup(idOrCode: string): Promise<GroupDto | null> {
    const group = await this.GroupModel.findOne({
      $or: [{ _id: idOrCode }, { code: idOrCode }],
    })
      .lean()
      .exec();
    if (!group) {
      return null;
    }
    return plainToClass(GroupDto, group);
  }

  async find(): Promise<Group[]> {
    return this.GroupModel.find().lean().exec();
  }

  private async groupExists(code: string): Promise<boolean> {
    const group = await this.GroupModel.findOne({ code }).lean().exec();
    if (code) {
      return false;
    }
    return !!group;
  }

  // // async joinGroup(joinGroupDto: JoinGroupDto): Promise<{ message: string }> {
  // //   const { userId, code } = joinGroupDto;

  //   if (!this.groupExists(code)) {
  //     throw new HttpException('Invalid code', HttpStatus.BAD_REQUEST);
  //   }

  //   try {
  //     const groupId = await this.groupExists(code);

  //     if (groupId) {
  //       await this.addStudentToGroup(code, userId);
  //       return { message: 'Student successfully added to group' };
  //     } else {
  //       throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
  //     }
  //   } catch (error) {
  //     throw new HttpException(
  //       'Internal server error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async addStudentToGroup(groupId: string, userId: string): Promise<void> {
    const group = await this.GroupModel.findById(groupId);
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }
    if (!group.members.includes(userId)) {
      throw new BadRequestException(
        `User ${userId} is already a member of group ${groupId}`,
      );
    }

    group.members.push(userId);
    await group.save();
  }

  async removeStudentFromGroup(groupId: string, userId: string): Promise<void> {
    const group = await this.GroupModel.findById(groupId).exec();
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    if (!group.members.includes(userId)) {
      throw new BadRequestException(
        `User ${userId} is not a member of group ${groupId}`,
      );
    }

    group.members = group.members.filter((studentId) => studentId !== userId);
    await group.save();
  }

  async remove(idOrCode: string): Promise<void> {
    const group = await this.GroupModel.findOneAndDelete({
      $or: [{ _id: idOrCode }, { code: idOrCode }],
    }).exec();

    if (!group) {
      throw new NotFoundException(
        `Group with ID or code ${idOrCode} not found`,
      );
    }
  }
}
