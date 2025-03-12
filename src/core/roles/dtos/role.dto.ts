import { Expose, Type } from 'class-transformer';
import {
  Action,
  BaseDto,
  Subject,
  SystemStatus,
  AccountBasicDto,
} from '../../../libs';
export class PermissionRule {
  @Expose()
  action!: Action;

  @Expose()
  subject!: Subject;
}

export class RoleDto extends BaseDto {
  @Expose()
  name!: string;

  @Expose()
  code!: string;

  @Expose()
  @Type(() => PermissionRule)
  permissions!: PermissionRule[];

  @Expose()
  status!: SystemStatus;

  @Expose()
  @Type(() => AccountBasicDto)
  updatedBy!: AccountBasicDto;

  @Expose()
  @Type(() => AccountBasicDto)
  createdBy?: AccountBasicDto;

  @Expose()
  @Type(() => Date)
  updatedAt!: Date;
}
