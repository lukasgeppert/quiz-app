import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { QuestionType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { CreateQuestionDto } from "src/questions/dto/create-question.dto";
import { IsValidPos } from "src/shared/decorator/is-valid-pos.decorator";

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

    @IsNumber()
    examId: number;

    public toQuestion(): CreateQuestionDto {
        return {
            question: this.question,
            description: this.description,
            type: QuestionType.MULTIPLE_SELECT,
            options: this.options,
            answers: [this.answer],
            examId: this.examId
        }
    }
}
