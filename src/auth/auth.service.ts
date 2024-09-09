import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
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

    return this.authenticate(existingUser.id, existingUser.email);
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
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

  async authenticate(userId: number, userEmail: string) {
    const payload = {
      sub: userId,
      email: userEmail,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
