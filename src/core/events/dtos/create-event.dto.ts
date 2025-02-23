import { Expose } from 'class-transformer';
import { EventTypeDto } from './event-type.dto';
import { FieldConstraints } from '../../../libs';
import { MaxLength } from 'class-validator';

export class CreateEventDto {
  @Expose()
  @MaxLength(FieldConstraints.TITLE.MAX_LENGTH)
  title!: string;

  @Expose()
  @MaxLength(FieldConstraints.DESCRIPTION.MAX_LENGTH)
  description!: string;

  @Expose()
  groups!: string[];

  @Expose()
  eventType!: EventTypeDto;

  @Expose()
  startDate!: Date;

  @Expose()
  endDate!: Date;
}
