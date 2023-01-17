import { QuestionType } from "@prisma/client";
import { IsEnum, IsNumber } from "class-validator";

export class ParamQuestionDto {
    @IsNumber()
    examId: number;

    @IsNumber()
    id: number;
}