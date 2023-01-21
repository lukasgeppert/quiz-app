import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [PrismaModule, ConfigModule],
})
export class QuestionsModule {}
