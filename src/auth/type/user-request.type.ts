import { UserRole } from 'src/user/enum/roles.enum';

export interface UserRequest extends Request {
  user: {
    userId: number;
    email: string;
    role: UserRole;
  };
}
