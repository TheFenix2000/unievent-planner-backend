import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteStudentDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  groupId!: string;
}
