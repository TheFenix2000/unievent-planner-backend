import { Expose, Type } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { UserAccountDto } from '../../accounts/dtos/user-account.dto';
import { JoinCodeDto } from '../../join-codes/dtos/join-code.dto';
import { BaseDto, SystemStatus, VerificationStatus } from '../../../libs';

export class GroupDto extends BaseDto {
  @Expose()
  name!: string;

  @Expose()
  courseName?: string;

  @Expose()
  description?: string;

  @Expose()
  avatarUrl!: string;

  @IsDefined()
  @Expose()
  status!: SystemStatus;

  @IsDefined()
  @Expose()
  verificationStatus!: VerificationStatus;

  @Expose()
  rejectionReason?: string;

  @Expose()
  @Type(() => UserAccountDto)
  president!: UserAccountDto;

  @Expose()
  @Type(() => UserAccountDto)
  members!: UserAccountDto[];

  @Expose()
  @Type(() => JoinCodeDto)
  joinCodes!: JoinCodeDto[];
}
