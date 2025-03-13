import { Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserAccountDto {
  @Expose()
  @IsString()
  firstName?: string;

  @Expose()
  @IsString()
  lastName?: string;

  @Expose()
  @IsEmail()
  email!: string;
}
