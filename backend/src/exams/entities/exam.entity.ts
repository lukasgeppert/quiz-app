import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Exam, QuestionType } from "@prisma/client";
import { QuestionEntity } from "src/questions/entities/question.entity";
import { ShortAnswerEntity } from "src/questions/short-answer/entities/short-answer.entity";
import { MultipleChoiceEntity } from "src/questions/multiple-choice/entities/multiple-choice.entity";
import { MultipleSelectEntity } from "src/questions/multiple-select/entities/multiple-select.entity";
import { TrueFalseEntity } from "src/questions/true-false/entities/true-false.entity";

export class ExamEntity implements Exam {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    @ApiHideProperty()
    deletedAt: Date | null = null;

    @Exclude()
    @ApiHideProperty()
    isDeleted: boolean;

    @Exclude()
    @ApiHideProperty()
    userId: number;

    @ApiProperty({ type: TrueFalseEntity, isArray: true })
    trueFalse: TrueFalseEntity[];
    multipleChoice: MultipleChoiceEntity[];
    multipleSelect: MultipleSelectEntity[];
    shortAnswer: ShortAnswerEntity[];


    @Exclude()
    @ApiHideProperty()
    questions: QuestionEntity[];


    constructor(partial: Partial<ExamEntity>) {
        const { questions, ...rest } = partial;
        Object.assign(this, rest);
        this.trueFalse = questions.filter(q => q.type === QuestionType.TRUE_FALSE).map(q => q.toTrueFalse());
        this.multipleChoice = questions.filter(q => q.type === QuestionType.MULTIPLE_CHOICE).map(q => q.toMultipleChoice());
        this.multipleSelect = questions.filter(q => q.type === QuestionType.MULTIPLE_SELECT).map(q => q.toMultipleSelect());
        this.shortAnswer = questions.filter(q => q.type === QuestionType.SHORT_ANSWER).map(q => q.toShortAnswer());

    }
}



export class ListExamEntity {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    @ApiHideProperty()
    deletedAt: Date | null = null;

    @Exclude()
    @ApiHideProperty()
    isDeleted: boolean;

    @Exclude()
    @ApiHideProperty()
    userId: number;

    constructor(partial: Partial<ExamEntity>) {
        Object.assign(this, partial);
    }
}