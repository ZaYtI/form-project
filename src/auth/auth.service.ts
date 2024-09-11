import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './type/payload.type';
import { UserRole } from 'src/user/enum/roles.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userService.create(createUserDto);
  }

  async signIn(loginDto: LoginDto) {
    const existingUser = await this.validateUser(loginDto);

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return this.authenticate(
      existingUser.id,
      existingUser.email,
      existingUser.role,
    );
  }

  async validateUser(loginDto: LoginDto) {
    const existingUser = await this.userService.findByEmail(loginDto.email);

    if (!existingUser) {
      throw new Error('The user does not exist');
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return existingUser;
  }

  async authenticate(userId: number, userEmail: string, role: UserRole) {
    const payload: Payload = {
      userId: userId,
      email: userEmail,
      role: role,
    };

    console.log('authenticate', payload);

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
