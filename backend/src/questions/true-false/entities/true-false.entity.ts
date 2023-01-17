import { QuestionType } from "@prisma/client";

export class TrueFalseEntity {
    id: number;
    type: QuestionType = QuestionType.TRUE_FALSE;
    question: string;
    description: string | null;
    answer: boolean;

}
