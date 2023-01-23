import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';

export class CreateTrueFalseDto {
  @IsString()
  question: string;

  @ApiPropertyOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  answer: boolean;

  @IsNumber()
  examId: number;

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @Type(() => String)
  tags: string[] = [];
  score: number;

  public toQuestion(): CreateQuestionDto {
    return {
      question: this.question,
      description: this.description,
      type: QuestionType.TRUE_FALSE,
      options: ['False', 'True'],
      answers: [this.answer ? 1 : 0],
      tags: this.tags,
      examId: this.examId,
      score: this.score,
    };
  }
}
