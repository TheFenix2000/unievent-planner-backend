import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
import { RoleService } from '../services/roles.service';
import { RoleDto } from '../dtos/role.dto';
import { Role } from 'src/models/role.model';
import { CreateRoleDto } from '../dtos/create.role.dto';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.rolesService.createRole(createRoleDto);
  }
  @Delete(':roleOrId')
  async deleteRole(@Param('roleOrId') roleOrId: string): Promise<Role> {
    return this.rolesService.deleteRole(roleOrId);
  }
  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }
  @Get(':roleOrIdSzukaj')
  async getRole(
    @Param('roleOrIdSzukaj') roleOrIdSzukaj: string,
  ): Promise<Role> {
    return this.rolesService.getRole(roleOrIdSzukaj);
  }
}
