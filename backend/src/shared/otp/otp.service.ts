import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Injectable()
export class OtpService {

    constructor(
        private configService: ConfigService,
        private redisService: RedisCacheService) { }

    private hashOtp(otp: string) {
        return bcrypt.hash(otp, this.configService.getOrThrow('SALT'));
    }
    async generateOtp(id: number) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hash = await this.hashOtp(otp);
        await this.redisService.set(`otp:${id}`, hash, this.configService.getOrThrow('OTP_EXPIRATION_TIME'));
        return otp;
    }

    async verifyOtp(id: number, otp: string) {
        const hash = await this.redisService.get(`otp:${id}`);
        console.log(hash);
        if (!hash) {
            return false;
        }
        return bcrypt.compare(otp, hash);
    }



}
