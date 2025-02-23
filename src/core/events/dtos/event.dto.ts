import { Expose } from 'class-transformer';
import { BaseDto } from '../../../libs';
import { EventTypeDto } from './event-type.dto';
import { GroupDto } from '../../groups/dtos/group.dto';

export class EventDto extends BaseDto {
  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  startDate!: Date;

  @Expose()
  endDate!: Date;

  @Expose()
  groups!: GroupDto[];

  @Expose()
  eventType!: EventTypeDto;
}
