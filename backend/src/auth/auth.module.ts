import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/shared/mail/mail.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { AccessTokenModule } from './access-token/access-token.module';
import { GoogleController } from './google/google.controller';
import { GoogleStrategy } from './google/google.strategy';
import { GoogleService } from './google/google.service';

@Module({
  controllers: [
    AuthController,
    GoogleController
  ],
  providers: [
    GoogleStrategy,
    GoogleService
  ],
  imports: [
    UsersModule,
    ConfigModule,
    MailModule,
    AccessTokenModule,
    RefreshTokenModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true
    }),
  ],
  exports: [
    PassportModule,
  ]
})
export class AuthModule { }
