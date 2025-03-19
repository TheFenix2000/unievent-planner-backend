import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { isObjectIdOrHexString, Model } from 'mongoose';
import { Role } from 'src/models/role.model';
import { UpserDefaultsService } from '../../../upser-defaults/upser-defaults.service';
import { UserAccountDto } from '../../accounts/dtos/user-account.dto';
import { RoleDto } from '../dtos/role.dto';
import { CreateRoleDto } from '../dtos/create.role.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly upserDefaultsService: UpserDefaultsService,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleDto> {
    const newRole = new this.roleModel();

    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();
    newRole.updatedAt = new Date();
    newRole.createdAt = new Date();
    newRole.updatedBy = user.id;
    newRole.createdBy = user.id;
    newRole.name = createRoleDto.name;
    newRole.code = createRoleDto.code;
    newRole.permissions = createRoleDto.permissions;
    newRole.status = createRoleDto.status;

    const createdrole = await newRole.save();

    return plainToClass(RoleDto, createdrole, {
      excludeExtraneousValues: true,
    });
  }

  async remove(roleOrId: string): Promise<Role> {
    let deletedRole: Role;

    if (isObjectIdOrHexString(roleOrId)) {
      deletedRole = await this.roleModel.findByIdAndDelete(roleOrId).exec();
    } else {
      deletedRole = await this.roleModel
        .findOneAndDelete({ code: roleOrId })
        .exec();
    }

    if (!deletedRole) {
      throw new NotFoundException(`Role ${roleOrId} not found`);
    }

    return deletedRole;
  }
  async findAllRoles(): Promise<Role[]> {
    return this.roleModel
      .find()
      .populate('updatedBy')
      .populate('createdBy')
      .lean()
      .exec();
  }

  async findRole(roleOrIdSearch: string): Promise<Role> {
    let roleDetails: Role;

    if (isObjectIdOrHexString(roleOrIdSearch)) {
      roleDetails = await this.roleModel
        .findById(roleOrIdSearch)
        .populate('createdBy')
        .populate('updatedBy')
        .lean()
        .exec();
    } else {
      roleDetails = await this.roleModel
        .findOne({ code: roleOrIdSearch })
        .populate('createdBy')
        .populate('updatedBy')
        .lean()
        .exec();
    }

    if (!roleDetails) {
      throw new NotFoundException(`Role ${roleOrIdSearch} not found`);
    }

    return roleDetails;
  }
}
