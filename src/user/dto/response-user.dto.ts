import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  birthDate: Date;

  @Expose()
  email: string;

  @Exclude()
  password?: string;

  @Exclude()
  role?: string;
}
