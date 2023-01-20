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

  create({ examId, tags, ...createQuestionDto }: CreateQuestionDto) {
    return this.prisma.question.create({
      data: {
        ...createQuestionDto,
        exam: {
          connect: {
            id: examId,
          }
        },
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          })
          )
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

  update(id: number, { tags, ...updateQuestionDto }: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: {
        id,
      },
      data: {
        ...updateQuestionDto,
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },

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
    const deletedQuestions = await this.prisma.question.deleteMany({
      where: {
        isDeleted: true,
        deletedAt: {
          lte
        },
      }
    });
    console.log(`Deleted ${deletedQuestions.count} questions`);
  }
}
