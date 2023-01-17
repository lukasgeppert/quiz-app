import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { QuestionType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateQuestionDto } from "src/questions/dto/create-question.dto";

export class CreateMultipleSelectDto {
    @IsString()
    question: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ type: Number, isArray: true})
    @IsArray()
    @Type(() => Number)
    answers: number[];


    @ApiProperty({ type: String, isArray: true})
    @IsArray()
    @Type(() => String)
    options: string[];

    @IsNumber()
    examId: number;


    public toQuestion(): CreateQuestionDto {
        return {
            question: this.question,
            description: this.description,
            type: QuestionType.MULTIPLE_SELECT,
            options: this.options,
            answers: this.answers,
            examId: this.examId
        }
    }
}
