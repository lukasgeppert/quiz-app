import { ApiHideProperty, PartialType } from "@nestjs/swagger";
import { Question, Tag } from "@prisma/client";
import { Exclude } from "class-transformer";
import { MultipleChoiceEntity } from "src/questions/multiple-choice/entities/multiple-choice.entity";
import { ShortAnswerEntity } from "src/questions/short-answer/entities/short-answer.entity";
import { TrueFalseEntity } from "src/questions/true-false/entities/true-false.entity";


export class ExamEntity {
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

export class EntityWithQuestions {
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

    @Exclude()
    @ApiHideProperty()
    userId: number;

    trueFalse: TrueFalseEntity[]
    multipleChoice: MultipleChoiceEntity[]
    shortAnswer: ShortAnswerEntity[]
    multipleSelect: MultipleChoiceEntity[]

    constructor(partial: Partial<EntityWithQuestions>) {
        Object.assign(this, partial);
    }
    
}