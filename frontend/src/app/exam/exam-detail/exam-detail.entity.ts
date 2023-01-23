import { Exam } from "../exam.entity";


export interface ExamDetail extends Exam {
    trueFalse: TrueFalse[];
    multipleChoice: MultipleChoice[];
    shortAnswer: ShortAnswer[];
    multipleSelect: MultipleSelect[];
}



export interface TrueFalse {
    id: number;
    type: QuestionType;
    question: string;
    description: string;
    answer: boolean;
    tags: Tag[];
    score: number;
}

export interface MultipleChoice {
    id: number;
    question: string;
    type: QuestionType;
    description: string;
    options: string[];
    answer: number;
    tags: Tag[];
    score: number;
}

export interface ShortAnswer {
    id: number;
    question: string;
    type: QuestionType;
    description: string;
    answer: string;
    tags: Tag[];
    score: number;
}

export interface MultipleSelect {
    id: number;
    question: string;
    type: QuestionType;
    description: string;
    options: string[];
    answer: number;
    tags: Tag[];
    score: number;
}

export interface Tag {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    score: number;
}

export enum QuestionType {
    TRUE_FALSE = 'TRUE_FALSE',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    SHORT_ANSWER = 'SHORT_ANSWER',
    MULTIPLE_SELECT = 'MULTIPLE_SELECT'
}