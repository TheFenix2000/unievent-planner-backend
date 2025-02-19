import { Expose } from 'class-transformer';
import { EventType, EventTypeColor } from '../../../libs';

export class EventTypeDto {
  @Expose()
  color!: EventTypeColor;

  @Expose()
  type!: EventType;
}
