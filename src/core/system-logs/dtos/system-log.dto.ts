import { Expose } from 'class-transformer';
import { BaseDto } from '../../../libs';
import { SystemLogContext, SystemLogAction, SystemStatus } from '../../../libs';

export class SystemLogDto extends BaseDto {
  @Expose()
  action!: SystemLogAction;

  @Expose()
  message!: string;

  @Expose()
  context!: SystemLogContext;

  @Expose()
  relatedObjectId!: string;

  @Expose()
  status!: SystemStatus;
}
