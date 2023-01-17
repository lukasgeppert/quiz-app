import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  controllers: [ExamsController],
  providers: [ExamsService],
  imports: [
    PrismaModule, 
  ]
})
export class ExamsModule { }
