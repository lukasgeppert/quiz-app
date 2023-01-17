import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {

  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService) { }

  create({ examId, ...createQuestionDto }: CreateQuestionDto) {
    return this.prisma.question.create({
      data: {
        ...createQuestionDto,
        exam: {
          connect: {
            id: examId,
          }
        }
      }
    });
  }


  findOne(id: number) {
    return this.prisma.question.findFirstOrThrow({
      where: {
        id
      }
    });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: {
        id,
      },
      data: {
        ...updateQuestionDto,
      }
    });

  }

  async remove(id: number, force: boolean = false) {
    if (force) {
      return this.prisma.question.delete({
        where: {
          id,
        }
      });
    } else {
      return this.prisma.question.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        }
      });
    }
  }


  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {

    const lte = new Date(new Date().getTime() - this.configService.getOrThrow('PERMANETLY_DELETE_AFTER'));
    const questions = await this.prisma.question.findMany({
      where: {
        isDeleted: true,
        deletedAt: {
          lte
        }
      }
    });

    if (questions.length) {
      const ids = questions.map((question) => question.id);
      await this.prisma.question.deleteMany({
        where: {
          id: {
            in: ids
          }
        }
      });
    }
  }
}
