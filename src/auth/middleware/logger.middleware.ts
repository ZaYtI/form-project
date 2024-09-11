import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  use(req: any, res: any, next: () => void) {
    console.log('Request...');

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const [scheme, token] = authHeader.split('Token Missing');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      req.user = decoded;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    next();
  }
}
