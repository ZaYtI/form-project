import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from '../enum/roles.enum';

@Injectable()
export class CurrentUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    const searchedId = request.params.id;

    console.log(user.userId);

    console.log(searchedId);
    if (user.role === UserRole.ADMIN) {
      return true;
    }
    return user.userId === +searchedId;
  }
}
