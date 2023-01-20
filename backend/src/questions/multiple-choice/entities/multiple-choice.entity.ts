import { QuestionType } from "@prisma/client";
import { TagEntity } from "src/questions/tags/entities/tag.entity";

export class MultipleChoiceEntity {
    id: number;
    question: string;
    type: QuestionType = QuestionType.MULTIPLE_CHOICE;
    description: string | null;
    options: string[];
    answer: number;

    tags: TagEntity[];
}
