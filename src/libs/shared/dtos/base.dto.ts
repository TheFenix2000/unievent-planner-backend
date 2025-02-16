import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { AccountBasicDto } from './account-basic.dto';
import { BasicDto } from './basic.dto';
@Exclude()
export abstract class BaseDto extends BasicDto {
  @Expose()
  @Transform(
    ({ value, obj }) => {
      if (obj.createdBy) {
        return value;
      } else {
        return undefined;
      }
    },
    { toClassOnly: true },
  )
  @Type(() => Date)
  createdAt?: Date;

  @Expose()
  @Type(() => Date)
  updatedAt!: Date;

  @Expose()
  @Type(() => AccountBasicDto)
  createdBy?: AccountBasicDto;

  @Expose()
  @Type(() => AccountBasicDto)
  updatedBy!: AccountBasicDto;
}
