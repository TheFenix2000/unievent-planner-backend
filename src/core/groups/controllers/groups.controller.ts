import {
  Controller,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { GroupsService } from '../service/groups.service';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { GroupDto } from '../dtos/group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createGroupDto: CreateGroupDto): Promise<CreateGroupDto> {
    return this.groupsService.createGroup(createGroupDto);
  }

  // @Post('join')
  // joinGroup(@Body() joinGroupDto: JoinGroupDto) {
  //   return this.groupsService.joinGroup(joinGroupDto);
  // }

  // @Post()
  // addStudentToGroup(@Body() joinGroupDto: JoinGroupDto) {
  //   return this.groupsService.addStudentToGroup(
  //     joinGroupDto.code,
  //     joinGroupDto.userId,
  //   );
  // }

  // @Post()
  // removeStudentFromGroup(@Body() joinGroupDto: JoinGroupDto) {
  //   return this.groupsService.removeStudentFromGroup(
  //     joinGroupDto.code,
  //     joinGroupDto.userId,
  //   );
  // }

  @Delete(':idOrCode')
  remove(@Param('idOrCode') idOrCode: string): Promise<void> {
    return this.groupsService.remove(idOrCode);
  }

  @Get(':idOrCode')
  async getGroup(@Param('idOrCode') idOrCode: string): Promise<GroupDto> {
    return this.groupsService.getGroup(idOrCode);
  }

  @Get()
  async find() {
    return this.groupsService.find();
  }
}
