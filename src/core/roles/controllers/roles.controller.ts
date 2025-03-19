import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
import { RoleService } from '../services/roles.service';
import { RoleDto } from '../dtos/role.dto';
import { Role } from 'src/models/role.model';
import { CreateRoleDto } from '../dtos/create.role.dto';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.rolesService.create(createRoleDto);
  }
  @Delete(':roleOrId')
  async remove(@Param('roleOrId') roleOrId: string): Promise<Role> {
    return this.rolesService.remove(roleOrId);
  }
  @Get()
  async findAllRoles(): Promise<Role[]> {
    return this.rolesService.findAllRoles();
  }
  @Get(':roleOrIdSearch')
  async findRole(
    @Param('roleOrIdSearch') roleOrIdSzukaj: string,
  ): Promise<Role> {
    return this.rolesService.findRole(roleOrIdSzukaj);
  }
}
