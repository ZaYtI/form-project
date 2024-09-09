import { IsDate, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastName: string;

  @IsDate()
  birthdate: Date;

  @IsEmail()
  email: string;

  @Length(8, 20)
  @IsString()
  password: string;
}
