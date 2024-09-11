import { IsDateString, IsEmail, IsEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthDate: Date;

  @IsEmail()
  email: string;

  @IsEmpty()
  password: string;
}
