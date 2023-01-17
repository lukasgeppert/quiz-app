import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QueryDto } from 'src/shared/dto/query.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { QueryExamDto } from './dto/query-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamEntity, ListExamEntity } from './entities/exam.entity';

@Injectable()
export class ExamsService {

  constructor(
    private readonly prisma: PrismaService,
    private configSerivce: ConfigService) { }

  async create(userId: number, createExamDto: CreateExamDto) {
    const exam = await this.prisma.exam.create({
      data: {
        ...createExamDto,
        user: {
          connect: { id: userId }
        }
      }
    });
    return new ListExamEntity(exam);
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
    isDeleted
  }: QueryExamDto) {
    const where = {
      isDeleted: isDeleted ? true : false,
      [field]: { contains },
      createdAt: {
        gte,
        lte
      }
    };

    const orderBy = {
      [sort]: order
    };

    const exams = await this.prisma.exam.findMany({
      where,
      orderBy,
      skip,
      take,
    });

    return exams.map((exam) => new ListExamEntity(exam))

  }

  async findOne(id: number) {
    const exam = await this.prisma.exam.findUniqueOrThrow({
      where: { id },
      include: {
        Questions: true
      }
    });
    return new ExamEntity(exam);
  }

  async update(userId: number, id: number, updateExamDto: UpdateExamDto) {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (exam.userId !== userId)
      throw new Error('You are not authorized to delete this exam',);
    const examOutput = await this.prisma.exam.update({ where: { id }, data: updateExamDto });
    return new ListExamEntity(examOutput);
  }

  async remove(userId: number, id: number, force: boolean) {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (exam.userId !== userId)
      throw new Error('You are not authorized to delete this exam',);
    if (force) {
      const examOutput = await this.prisma.exam.delete({ where: { id } });
      return new ListExamEntity(examOutput);
    }
    const examOutput = await this.prisma.exam.update({ where: { id }, data: { isDeleted: true, deletedAt: new Date() } });
    return new ListExamEntity(examOutput);
  }


  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    const lte = this.configSerivce.getOrThrow('PRISMA_DELETE_AFTER');
    const exams = await this.prisma.exam.findMany({
      where: {
        isDeleted: true,
        deletedAt: {
          lte
        }
      }
    });
    if (exams.length) {
      await this.prisma.exam.deleteMany({
        where: {
          isDeleted: true,
          deletedAt: {
            lte
          }
        }
      });
    }
  }
    
}
