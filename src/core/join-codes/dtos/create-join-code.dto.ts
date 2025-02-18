import { Expose } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateJoinCodeDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  role!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  group!: string;

  @Expose()
  @IsNumber()
  @Optional()
  usesLeft?: number;

  @Expose()
  @Optional()
  expiresAt?: Date;

  @Expose()
  @IsNotEmpty()
  code!: string;
}
