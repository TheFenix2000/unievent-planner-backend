import { Expose } from 'class-transformer';
import { BaseDto } from '../../../libs/shared/dtos';
import { SystemContext, SystemLogAction, SystemStatus } from 'src/libs';

export class SystemLogDto extends BaseDto {
  @Expose()
  action!: SystemLogAction;

  @Expose()
  message!: string;

  @Expose()
  context!: SystemContext;

  @Expose()
  relatedObjectId!: string;

  @Expose()
  status!: SystemStatus;
}
