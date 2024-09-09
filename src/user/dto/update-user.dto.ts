import { IsDate, IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  birthdate: Date;

  @IsEmail()
  email: string;
}
