import { QuestionType } from "@prisma/client";

export class ShortAnswerEntity {
    id: number;
    question: string;
    type: QuestionType = QuestionType.SHORT_ANSWER;
    description: string | null;
    answer: string;
}
