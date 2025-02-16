import { Expose } from 'class-transformer';
import { BaseDto } from 'src/libs';
import { SystemLogContext, SystemLogAction, SystemStatus } from 'src/libs';

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
