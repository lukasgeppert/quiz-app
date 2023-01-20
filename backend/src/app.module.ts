import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { PrismaExceptionFilter } from './shared/filter/prisma.filter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ExamsModule } from './exams/exams.module';
import { QuestionsModule } from './questions/questions.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisCacheModule } from './shared/redis-cache/redis-cache.module';
import { LogMiddleware } from './shared/middleware/log.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        COOKIE_DOMAIN: Joi.string().default('localhost'),
        COOKIE_HTTP_ONLY : Joi.boolean().default(true),

        FRONTEND_URL: Joi.string().default('http://localhost:4200'),
        BACKEND_URL: Joi.string().default('http://localhost:3000'),

        SALT: Joi.number().default(10),

        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().default(24 * 60 * 60), // 24 hours
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().default(7 * 24 * 60 * 60), // 7 days
        ACCESS_TOKEN_COOKIE_NAME: Joi.string().default('access_token'),
        REFRESH_TOKEN_COOKIE_NAME: Joi.string().default('refresh_token'),

        GOOGLE_PROVIDER_ISSUER_URL: Joi.string().default('https://accounts.google.com'),
        GOOGLE_PROVIDER_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_PROVIDER_CLIENT_ID: Joi.string().required(),
        GOOGLE_PROVIDER_CALLBACK_URL: Joi.string().default('http://localhost:3000/auth/google/callback'),

        SMTP_API_KEY: Joi.string().required(),
        SMTP_API_HOST: Joi.string().default("smtp.sendgrid.net"),
        SMTP_API_USER: Joi.string().default("apikey"),
        SMTP_MAIL_FROM: Joi.string().required(),
        THROTTLE_TTL: Joi.number().default(60), // 60 seconds 
        THROTTLE_LIMIT: Joi.number().default(100), // 100 requests

        VERIFY_EMAIL_URL: Joi.string().default('http://localhost:3000/auth/verify-email'),

        REDIS_HOST: Joi.string().default('localhost'),
        REDIS_PORT: Joi.number().default(6379),
        REDIS_PASSWORD: Joi.string().required(),
        REDIS_TTL: Joi.number().default(60), // 60 seconds

        OTP_EXPIRATION_TIME: Joi.number().default(15 * 60 * 60), // 15 minutes
        OTP_RESEND_TIME: Joi.number().default(60), // 60 seconds
        PERMANETLY_DELETE_AFTER: Joi.number().default(7 * 24 * 60 * 60), // 7 days
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.getOrThrow('THROTTLE_TTL'),
        limit: config.getOrThrow('THROTTLE_LIMIT'),
      }),
    }),
    RedisCacheModule,
    ScheduleModule.forRoot(),

    UsersModule,
    AuthModule,
    ExamsModule,
    QuestionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    }, {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    }, {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }, {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
  
}
