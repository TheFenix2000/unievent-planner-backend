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

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleDto> {
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

  async deleteRole(roleOrId: string): Promise<Role> {
    let deletedRole: Role | null = null;

    if (isObjectIdOrHexString(roleOrId)) {
      deletedRole = await this.roleModel.findByIdAndDelete(roleOrId).exec();
    } else {
      deletedRole = await this.roleModel
        .findOneAndDelete({ code: roleOrId })
        .exec();
    }

    if (!deletedRole) {
      if (!deletedRole) {
        throw new NotFoundException(`Nie znaleziono roli ${roleOrId}`);
      }
      return deletedRole;
    }

    return deletedRole;
  }
  async getAllRoles(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }
}
