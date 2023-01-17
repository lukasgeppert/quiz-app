import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { QuestionType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    question: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(QuestionType)
    type: QuestionType;

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
}