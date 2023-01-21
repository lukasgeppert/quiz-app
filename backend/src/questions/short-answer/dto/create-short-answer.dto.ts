import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';

export class CreateShortAnswerDto {
  @IsString()
  question: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  answer: string;

  @IsNumber()
  examId: number;

  @IsOptional()
  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @Type(() => String)
  tags: string[] = [];

  public toQuestion(): CreateQuestionDto {
    return {
      type: QuestionType.SHORT_ANSWER,
      options: [this.answer],
      answers: [0],
      question: this.question,
      description: this.description,
      tags: this.tags,
      examId: this.examId,
    };
  }
}
