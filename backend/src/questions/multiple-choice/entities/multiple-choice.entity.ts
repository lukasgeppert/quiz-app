import { QuestionType } from "@prisma/client";

export class MultipleChoiceEntity {
    id: number;
    question: string;
    type: QuestionType = QuestionType.MULTIPLE_CHOICE;
    description: string | null;
    options: string[];
    answer: number;
}
