import { QuestionType } from "@prisma/client";

export class MultipleSelectEntity {
    id: number;
    question: string;
    type: QuestionType = QuestionType.MULTIPLE_SELECT;
    description: string | null;
    options: string[];
    answers: number[];
}
