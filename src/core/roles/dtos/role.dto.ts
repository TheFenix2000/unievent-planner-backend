import { Expose, Type } from 'class-transformer';
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
  code!: string;

  @Expose()
  @Type(() => PermissionRule)
  permissions!: PermissionRule[];

  @Expose()
  status!: SystemStatus;
}
