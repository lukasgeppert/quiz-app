import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { Payload } from '../entities/auth.entity';

@Injectable()
export class AccessTokenService {
  cookieName: string;
  cookieOptions: CookieOptions;

  constructor(private jwtService: JwtService, configService: ConfigService) {
    this.cookieName = configService.getOrThrow('ACCESS_TOKEN_COOKIE_NAME');
    const httpOnly = configService.getOrThrow('COOKIE_HTTP_ONLY');
    const domain = configService.getOrThrow('COOKIE_DOMAIN');
    const maxAge = configService.getOrThrow('ACCESS_TOKEN_EXPIRATION_TIME');
    this.cookieOptions = {
      httpOnly,
      path: '/',
      maxAge,
      domain,
    };
    console.log(this.cookieOptions);
  }

  sendCookie(res: Response, { email, id: sub, role }: UserEntity) {
    const data: Payload = { email, sub, role };
    const token = this.jwtService.sign(data);
    console.log(this.cookieName);
    res.cookie(this.cookieName, token, this.cookieOptions);
  }

  clearCookie(res: Response) {
    res.clearCookie(this.cookieName, this.cookieOptions);
  }
}
