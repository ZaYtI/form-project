import { IsDateString, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthDate: Date;

  @IsEmail()
  email: string;

  @Length(8, 20)
  @IsString()
  password: string;
}
