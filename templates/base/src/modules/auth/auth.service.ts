import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';

import { RegisterDto } from './dto/register.dto.js';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,

    private jwtService: JwtService,

    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    return this.usersService.create(dto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials "EMail"');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials Password ');
    }

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);

    const tokens = await this.generateTokens(user);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async generateTokens(user: any) {
    const payload = {
      sub: user.id,

      email: user.email,

      role: user.role.name,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),

      expiresIn: this.configService.get('JWT_EXPIRES'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRESH_SECRET'),

      expiresIn: this.configService.get('REFRESH_EXPIRES'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);

    await this.usersService.update(userId, {
      refreshToken: hashedToken,
    });
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException(
        'refress tokon nhi hai bhai yeh yeh user fraud hai',
      );
    }

    const matched = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!matched) {
      throw new UnauthorizedException('dono refresh token alagalag hai');
    }

    return await this.generateTokens(user);
  }
}
