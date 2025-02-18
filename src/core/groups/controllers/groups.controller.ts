import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { CreateJoinCodeDto } from '../../join-codes/dtos/create-join-code.dto';
import { JoinCodeDto } from '../../join-codes/dtos/join-code.dto';
import { CodesService } from '../../join-codes/service/code.service';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { GroupDto } from '../dtos/group.dto';
import { GroupsService } from '../service/groups.service';
import { DeleteStudentDto } from '../../join-codes/dtos/delete-student.dto';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly codeService: CodesService,
  ) {}

  @Get()
  async find(): Promise<GroupDto[]> {
    return this.groupsService.find();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<GroupDto> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(
        `Invalid group ID, should be valid ObjectId`,
      );
    }

    return this.groupsService.get(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return this.groupsService.create(createGroupDto);
  }

  @Post('code')
  @HttpCode(201)
  createJoinCode(
    @Body() createJoinCodeDto: CreateJoinCodeDto,
  ): Promise<JoinCodeDto> {
    return this.codeService.create(createJoinCodeDto);
  }

  @Post('join/:code')
  joinGroup(@Param('code') code: string): Promise<void> {
    return this.codeService.joinGroup(code);
  }

  @Delete('delete-student')
  removeStudentFromGroup(
    @Body() body: { deleteStudentDto: DeleteStudentDto },
  ): Promise<void> {
    const { groupId, userId } = body.deleteStudentDto;
    if (!isValidObjectId(userId) || !isValidObjectId(groupId)) {
      throw new BadRequestException(
        `Invalid groupId or userId, should be valid ObjectId`,
      );
    }

    return this.codeService.removeStudentFromGroup(groupId, userId);
  }

  @Delete(':idOrCode')
  @HttpCode(204)
  remove(@Param('idOrCode') id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(
        `Invalid group ID, should be valid ObjectId`,
      );
    }

    return this.groupsService.remove(id);
  }
}
