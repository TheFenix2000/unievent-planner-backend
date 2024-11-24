import { Expose, Type } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { BaseDto, SystemStatus } from '../../../libs';
import { GroupDto } from '../../groups/dtos';
import { RoleDto } from '../../roles/dtos';

export class JoinCodeDto extends BaseDto {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => RoleDto)
  role!: RoleDto;

  @Expose()
  @Type(() => GroupDto)
  group!: GroupDto;

  @Expose()
  @IsDefined()
  status!: SystemStatus;

  @Expose()
  uses!: number;

  @Expose()
  usesLeft?: number;

  @Expose()
  expiresAt: Date;
}
