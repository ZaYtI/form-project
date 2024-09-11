import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  // TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserRole } from 'src/user/enum/roles.enum';
import { Roles } from 'src/user/roles/roles.decorator';
import { RolesGuard } from 'src/user/roles/roles.guard';

@Controller('health')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    // private typeOrm: TypeOrmHealthIndicator,
  ) {}

  @Roles(UserRole.ADMIN)
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      // () => this.typeOrm.pingCheck('nestjs_formation'),
    ]);
  }
}
