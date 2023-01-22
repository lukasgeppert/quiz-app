import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RedisCacheService } from '../../shared/redis-cache/redis-cache.service';

@Injectable()
export class OtpService {
  ttl = 60 * 5;
  constructor(
    private configService: ConfigService,
    private redisService: RedisCacheService,
  ) {
    this.ttl = this.configService.getOrThrow('OTP_EXPIRATION_TIME');

  }

  private hashOtp(otp: string) {
    return bcrypt.hash(otp, this.configService.getOrThrow('SALT'));
  }

  async generateOtp(id: number) {

    if (await this.redisService.get(`otp:${id}`)) {
      throw new HttpException(`Wait for ${this.ttl / 60} minutes to generate new otp`, HttpStatus.BAD_REQUEST);
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hash = await this.hashOtp(otp);
    await this.redisService.set(
      `otp:${id}`,
      hash,
      this.ttl,
    );
    return otp;
  }

  async verifyOtp(id: number, otp: string) {
    const hash = await this.redisService.get(`otp:${id}`);
    if (!hash) {
      return false;
    }
    if (await bcrypt.compare(otp, hash)) {
      await this.redisService.del(`otp:${id}`);
      return true;
    }
    return false;
  }
}
