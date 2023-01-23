import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { IsValidPos } from 'src/shared/decorator/is-valid-pos.decorator';

export class CreateMultipleChoiceDto {
  @IsString()
  question: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Validate(IsValidPos, ['options'])
  answer: number;

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @Type(() => String)
  options: string[];

  @IsOptional()
  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @Type(() => String)
  tags: string[] = [];

  @IsNumber()
  examId: number;

  score: number;

  public toQuestion(): CreateQuestionDto {
    return {
      question: this.question,
      description: this.description,
      options: this.options,
      tags: this.tags,
      type: QuestionType.MULTIPLE_SELECT,
      answers: [this.answer],
      examId: this.examId,
      score: this.score,
    };
  }
}
