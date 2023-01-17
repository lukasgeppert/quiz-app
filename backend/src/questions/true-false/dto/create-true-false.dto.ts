import { QuestionType } from "@prisma/client";
import { CreateQuestionDto } from "src/questions/dto/create-question.dto";

export class CreateTrueFalseDto {
    question: string;
    description?: string;
    answer: boolean;

    examId: number;

    public toQuestion(): CreateQuestionDto {
        return {
            question: this.question,
            description: this.description,
            type: QuestionType.TRUE_FALSE,
            options: ["False", "True"],
            answers: [this.answer ? 1 : 0],
            examId: this.examId
        }
    }
}



