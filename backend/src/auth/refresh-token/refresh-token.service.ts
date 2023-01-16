import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { Payload } from '../entities/auth.entity';

@Injectable()
export class RefreshTokenService {
    cookieName: string;
    cookieOptions: CookieOptions;

    constructor(
        private jwtService: JwtService,
        configService: ConfigService) {

        this.cookieName = configService.getOrThrow('REFRESH_TOKEN_COOKIE_NAME')

        const domain = configService.getOrThrow('COOKIE_DOMAIN');
        const maxAge = configService.getOrThrow('REFRESH_TOKEN_EXPIRATION_TIME');
        this.cookieOptions = {
            httpOnly: true,
            path: "/auth/refresh",
            maxAge,
            domain,
        }
    }


    sendCookie(res: Response, { email, id: sub, role }: UserEntity) {
        const data: Payload = { email, sub, role };
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
