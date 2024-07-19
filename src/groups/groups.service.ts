import { Injectable, Param } from '@nestjs/common';
import { CodesService } from 'src/codes/codes.service';
import { AppRequirements } from 'src/config/app-requirements';
import { CreateGroupDto } from './dtos/create-group.dto';
import { randomBytes } from 'crypto';
@Injectable()
export class GroupsService {
  constructor(private readonly codesService: CodesService) {}

  private generateCode(length: number = 6): string {
    return randomBytes(length)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, length);
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    const leaderCode = this.generateCode();
    const studentCode = this.generateCode();

    const createGroup = {
      ...createGroupDto,
      leaderCode,
      studentCode,
    };
    return createGroup;
  }

  async getGroup(@Param('idOrCode') idOrCode: string) {
    //TODO: logika zwrcania
  }

  async getGroups() {
    //TODO: logika zwrcania bazy danych na findall
    return;
  }

  async groupExists(code: string): Promise<boolean> {
    // TODO: Add logic
    if (!AppRequirements.validateCode(code)) {
      return false;
    }
    return;
  }

  async addStudentToGroup(groupId: string, userId: string): Promise<void> {
    console.log(` Dodaję użytkownika ${userId} do grupy ${groupId}`);
    // TODO: Add logic
  }

  async removeStudentFromGroup(groupId: string, userId: string): Promise<void> {
    console.log(`Usuwam użytkownika ${userId} z grupy ${groupId}`);
    // TODO: Add logic
  }

  async removeGroup(@Param('idOrCode') idOrCode: string) {
    return; // TODO: Add logic
  }
}
