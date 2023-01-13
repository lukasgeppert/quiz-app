import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  imports:[
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport:{
          host: config.getOrThrow('SMTP_API_HOST'),
          port: 465,
          secure: true,
          auth: {
            user: config.getOrThrow('SMTP_API_USER'),
            pass: config.getOrThrow('SMTP_API_KEY'),
          },
        },
        defaults: {
          from: `"No Reply" ${config.getOrThrow('SMTP_MAIL_FROM')}>`,
        },
      })
    })
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}
