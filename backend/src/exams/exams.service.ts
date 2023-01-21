import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QuestionType } from '@prisma/client';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { QueryExamDto } from './dto/query-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { EntityWithQuestions, ExamEntity } from './entities/exam.entity';

@Injectable()
export class ExamsService {
  constructor(
    private readonly prisma: PrismaService,
    private configSerivce: ConfigService,
  ) {}

  async create(userId: number, createExamDto: CreateExamDto) {
    const exam = await this.prisma.exam.create({
      data: {
        ...createExamDto,
        user: {
          connect: { id: userId },
        },
      },
    });
    return new ExamEntity(exam);
  }

  async findAll({
    skip,
    take,
    from: gte,
    to: lte,
    field,
    contains,
    sort,
    order,
    isDeleted,
  }: QueryExamDto) {
    const where = {
      isDeleted: isDeleted ? true : false,
      [field]: { contains },
      createdAt: {
        gte,
        lte,
      },
    };

    const orderBy = {
      [sort]: order,
    };

    const exams = await this.prisma.exam.findMany({
      where,
      orderBy,
      skip,
      take,
    });

    return exams.map((exam) => new ExamEntity(exam));
  }

  async findOne(id: number) {
    const { questions, ...exam } = await this.prisma.exam.findUniqueOrThrow({
      where: { id },
      include: {
        questions: {
          where: { isDeleted: false },
          include: {
            tags: true,
          },
        },
      },
    });
    const examEntity = new EntityWithQuestions(exam);
    const questionsEntity = questions.map(
      (question) => new QuestionEntity(question),
    );
    examEntity.trueFalse = questionsEntity
      .filter((question) => question.type === QuestionType.TRUE_FALSE)
      .map((question) => question.toTrueFalse());
    examEntity.multipleChoice = questionsEntity
      .filter((question) => question.type === QuestionType.MULTIPLE_CHOICE)
      .map((question) => question.toMultipleChoice());
    examEntity.multipleSelect = questionsEntity
      .filter((question) => question.type === QuestionType.MULTIPLE_SELECT)
      .map((question) => question.toMultipleChoice());
    examEntity.shortAnswer = questionsEntity
      .filter((question) => question.type === QuestionType.SHORT_ANSWER)
      .map((question) => question.toShortAnswer());

    return examEntity;
  }

  async update(userId: number, id: number, updateExamDto: UpdateExamDto) {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (exam.userId !== userId)
      throw new Error('You are not authorized to delete this exam');
    const examOutput = await this.prisma.exam.update({
      where: { id },
      data: updateExamDto,
    });
    return new ExamEntity(examOutput);
  }

  async remove(userId: number, id: number, force: boolean) {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (exam.userId !== userId)
      throw new Error('You are not authorized to delete this exam');
    if (force) {
      const examOutput = await this.prisma.exam.delete({ where: { id } });
      return new ExamEntity(examOutput);
    }
    const examOutput = await this.prisma.exam.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
    return new ExamEntity(examOutput);
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    const lte = this.configSerivce.getOrThrow('PRISMA_DELETE_AFTER');
    const exams = await this.prisma.exam.deleteMany({
      where: {
        isDeleted: true,
        deletedAt: {
          lte,
        },
      },
    });
    Logger.log(`Deleted ${exams.count} exams`);
  }
}
