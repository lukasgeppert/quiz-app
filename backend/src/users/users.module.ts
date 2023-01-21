import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RoleGaurd } from '../shared/role/role.gaurd';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RoleGaurd,
    },
  ],
  imports: [PrismaModule, ConfigModule],
  exports: [UsersService],
})
export class UsersModule {}
