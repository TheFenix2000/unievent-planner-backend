import { Expose, Type } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { Action, BaseDto, Subject, SystemStatus } from '../../../libs';

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
  @Type(() => PermissionRule)
  permissions!: PermissionRule[];

  @Expose()
  @IsDefined()
  status!: SystemStatus;
}
