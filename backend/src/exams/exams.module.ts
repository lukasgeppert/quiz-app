import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ExamsController],
  providers: [ExamsService],
  imports: [
    PrismaModule, 
    ConfigModule,
  ]
})
export class ExamsModule { }
