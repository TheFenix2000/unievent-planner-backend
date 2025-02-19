import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { UserAccount } from 'src/models';
import { UserAccountDto } from '../dtos';
import { CreateUserAccountDto } from '../dtos/create-user-account.dto';
import { UpserDefaultsService } from 'src/upser-defaults/upser-defaults.service';

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
    const createUserAccountDoc = new this.userAccountModel();
    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();

    createUserAccountDoc.email = 'exampleUsername@exampleMail.com';
    createUserAccountDoc.username = createUserAccountDto.email.split('@')[0];
    createUserAccountDoc.firstName = 'example first name';
    createUserAccountDoc.lastName = 'example last name';
    createUserAccountDoc.groups = [];
    createUserAccountDoc.role = [];
    createUserAccountDoc.createdBy = user.id;
    createUserAccountDoc.updatedBy = user.id;

    const result = await createUserAccountDoc.save();
    return plainToClass(UserAccountDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
