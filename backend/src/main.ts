import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow('PORT');
  const config = new DocumentBuilder()
    .setTitle(`NestJS API ${process.env.npm_package_version}}`)
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addCookieAuth('auth-cookie', {
      description: 'Cookies are set automatically. No need to add.',
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    .addOAuth2({
      type: 'oauth2',
      flows: {
        implicit: {
          authorizationUrl: `${configService.getOrThrow(
            'BACKEND_URL',
          )}/auth/google/backend-login`,
          scopes: {
            'read:users': 'read users',
            'write:users': 'modify users',
          },
        },
      },
    })
    .build();
  app.use(cookieParser());
  app.enableCors({
    origin: [
      configService.getOrThrow('FRONTEND_URL'),
      configService.getOrThrow('BACKEND_URL'),
    ],
    credentials: true,
  });
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./api/swagger.json', JSON.stringify(document, null, 4));
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

bootstrap();
