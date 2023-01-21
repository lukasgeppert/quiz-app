import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheModule } from '../../shared/redis-cache/redis-cache.module';
import { OtpService } from './otp.service';

@Module({
  providers: [OtpService],
  imports: [
    ConfigModule,
    RedisCacheModule
  ],
  exports: [OtpService],
})
export class OtpModule { }
