import { UserRole } from 'src/user/enum/roles.enum';

export type Payload = {
  userId: number;
  email: string;
  role: UserRole;
};
