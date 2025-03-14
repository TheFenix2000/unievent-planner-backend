import { Expose, Type } from 'class-transformer';
import { PermissionRule } from './role.dto';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
  IsDefined,
  IsEnum,
  Validate,
} from 'class-validator';
import { FieldConstraints, SystemStatus } from '../../../libs';
import { IsValidPermission } from '../../../libs/shared/validators/permission.validator';

export class CreateRoleDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(FieldConstraints.NAME.MAX_LENGTH)
  name!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(FieldConstraints.CODE.MAX_LENGTH)
  @Matches(FieldConstraints.CODE.PATTERN)
  code!: string;

  @Expose()
  @Type(() => PermissionRule)
  @Validate(IsValidPermission, { each: true })
  permissions!: PermissionRule[];

  @Expose()
  @IsDefined()
  @IsEnum(SystemStatus)
  status!: SystemStatus;
}
