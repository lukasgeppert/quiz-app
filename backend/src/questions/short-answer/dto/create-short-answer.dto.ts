import { ApiPropertyOptional } from "@nestjs/swagger";
import { QuestionType } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreateQuestionDto } from "src/questions/dto/create-question.dto";

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


    public toQuestion(): CreateQuestionDto {
        return {
            question: this.question,
            description: this.description,
            type: QuestionType.SHORT_ANSWER,
            options: [this.answer],
            answers: [0],
            examId: this.examId
        }
    }
}
