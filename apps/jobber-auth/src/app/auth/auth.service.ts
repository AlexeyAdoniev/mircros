import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.dto';

import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginInput, response: Response) {
    const user = await this.verify(email, password);
    const expires = new Date();

    expires.setTime(
      expires.getTime() + parseInt(this.configService.get('JWT_EXPIRE_MS')),
    );
    console.log(expires);

    const payload: TokenPayload = {
      id: user.id,
    };
    const token = this.jwtService.sign(payload);
    response.cookie('Authentication', token, {
      expires,
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
    });
    return user;
  }

  private async verify(email: string, password: string) {
    try {
      const user = await this.userService.user({ email, password });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (e) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }
}
