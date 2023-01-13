import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import { Payload } from '../entities/auth.entity';

@Injectable()
export class AccessTokenService {
    cookieName: string;
    cookieOptions: CookieOptions;

    constructor(
        private jwtService: JwtService,
        configService: ConfigService) {

        this.cookieName = configService.getOrThrow('ACCESS_TOKEN_COOKIE_NAME')

        const domain = configService.getOrThrow('COOKIE_DOMAIN');
        const maxAge = configService.getOrThrow('ACCESS_TOKEN_EXPIRATION_TIME');
        this.cookieOptions = {
            httpOnly: true,
            path: "/auth/refresh",
            maxAge,
            domain,
        }
    }

    sendCookie(res: Response, data: Payload) {
        const token = this.jwtService.sign(data);
        res.cookie(
            this.cookieName,
            token,
            this.cookieOptions)
    }

    clearCookie(res: Response) {
        res.clearCookie(this.cookieName, this.cookieOptions);
    }
}
