import { Controller, Req } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { Post } from '@nestjs/common';
// TODO: uncomment when auth implemented
// eslint-disable-next-line n/no-extraneous-import
import { Request } from 'express';
import { RoleType } from 'src/libs';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('add-student-role')
  async addStudentRole(@Req() req: Request): Promise<string> {
    return await this.accountsService.addRole(
      RoleType.STUDENT,
      'email@email.com',
      // TODO: uncomment when auth implemented
      // req.session.user.email,
    );
  }

  @Post('add-president-role')
  async addPresidentRole(@Req() req: Request): Promise<string> {
    return await this.accountsService.addRole(
      RoleType.PRESIDENT,
      'email@email.com',
      // TODO: uncomment when auth implemented
      // req.session.user.email,
    );
  }
}
