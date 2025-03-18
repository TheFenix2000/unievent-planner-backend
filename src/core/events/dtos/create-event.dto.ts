import { IsDateString, IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Expose } from 'class-transformer';
import { EventTypeDto } from './event-type.dto';
import { FieldConstraints } from '../../../libs';
import { MaxLength } from 'class-validator';

export class CreateEventDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(FieldConstraints.TITLE.MAX_LENGTH)
  title!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(FieldConstraints.DESCRIPTION.MAX_LENGTH)
  description!: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  groups!: string[];

  @Expose()
  @IsNotEmpty()
  eventType!: EventTypeDto;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  startDate!: Date;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  endDate!: Date;
}
