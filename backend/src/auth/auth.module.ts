import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { AccessTokenModule } from './access-token/access-token.module';

@Module({
  controllers: [AuthController],
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
  exports: [PassportModule]
})
export class AuthModule { }
