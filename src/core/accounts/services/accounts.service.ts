import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { UserAccount } from 'src/models';
import { UpserDefaultsService } from 'src/upser-defaults/upser-defaults.service';
import { CreateUserAccountDto, UserAccountDto } from '../dtos';
import { RoleType } from 'src/libs';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(UserAccount.name)
    private userAccountModel: Model<UserAccount>,
    private upserDefaultsService: UpserDefaultsService,
  ) {}

  async create(
    createUserAccountDto: CreateUserAccountDto,
  ): Promise<UserAccountDto> {
    const systemUser = (await this.upserDefaultsService.getSystemAccount()).id;
    const studentRole = (await this.upserDefaultsService.getStudentRole()).id;
    const createUserAccountDoc = new this.userAccountModel();

    createUserAccountDoc.firebaseId = createUserAccountDto.firebaseId;
    createUserAccountDoc.email = createUserAccountDto.email;
    createUserAccountDoc.username = createUserAccountDto.email.split('@')[0];
    createUserAccountDoc.firstName = createUserAccountDto.firstName;
    createUserAccountDoc.lastName = createUserAccountDto.lastName;
    createUserAccountDoc.groups = [];
    // TODO: remove studentRole below when roles assignment is implemented
    createUserAccountDoc.role = [studentRole];
    createUserAccountDoc.createdBy = systemUser;
    createUserAccountDoc.updatedBy = systemUser;

    const result = await createUserAccountDoc.save();
    return plainToClass(UserAccountDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: string): Promise<UserAccountDto> {
    const userAccount = await this.userAccountModel
      .findById(id)
      .populate('createdBy updatedBy groups role')
      .lean()
      .exec();
    const userAccountDto = plainToClass(UserAccountDto, userAccount, {
      excludeExtraneousValues: true,
    });
    return userAccountDto;
  }

  async findByEmail(email: string): Promise<UserAccountDto> {
    const userAccount = await this.userAccountModel
      .findOne({ email })
      .populate('createdBy updatedBy groups role')
      .lean()
      .exec();
    const userAccountDto = plainToClass(UserAccountDto, userAccount, {
      excludeExtraneousValues: true,
    });
    return userAccountDto;
  }

  async addRole(roleName: string, email: string): Promise<string> {
    try {
      const roleId =
        roleName === RoleType.STUDENT
          ? (await this.upserDefaultsService.getStudentRole()).id
          : (await this.upserDefaultsService.getPresidentRole()).id;

      const userAccount = await this.userAccountModel.findOne({ email }).exec();
      if (!userAccount.role.includes(roleId)) {
        userAccount.role.push(roleId);
        await userAccount.save();
        return `${roleName} role added.`;
      } else {
        throw new ConflictException(`${roleName} role already assigned.`);
      }
    } catch (error) {
      throw new ConflictException(`${roleName} role already assigned.`);
    }
  }

  async hasAnyRoleByEmail(email: string): Promise<boolean> {
    const userAccount = await this.userAccountModel
      .findOne({ email })
      .lean()
      .exec();
    if (userAccount.role.length > 0) {
      return true;
    }
    return false;
  }
}
