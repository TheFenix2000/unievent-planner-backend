import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { SystemLogContext, SystemLogAction } from '../../../libs';

export class CreateSystemLogDto {
  @Expose()
  @IsEnum(SystemLogAction)
  @IsNotEmpty()
  action!: SystemLogAction;

  @Expose()
  @IsString()
  @IsNotEmpty()
  message!: string;

  @Expose()
  @IsEnum(SystemLogContext)
  @IsNotEmpty()
  context!: SystemLogContext;

  @Expose()
  @IsString()
  @IsNotEmpty()
  relatedObjectId!: string;
}
