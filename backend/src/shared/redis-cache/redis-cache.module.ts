import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RedisCacheService } from './redis-cache.service';

@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
              host: configService.getOrThrow('REDIS_HOST'),
              port: configService.getOrThrow('REDIS_PORT'),
              password: configService.getOrThrow('REDIS_PASSWORD'),
              ttl: configService.getOrThrow('REDIS_TTL'),
            }),
            inject: [ConfigService],
            imports: [ConfigModule],
          }),
    ],
    providers: [
        RedisCacheService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
    exports: [RedisCacheService],
})
export class RedisCacheModule {}
