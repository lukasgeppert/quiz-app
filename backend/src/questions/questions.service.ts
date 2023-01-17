import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) { }
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
}
