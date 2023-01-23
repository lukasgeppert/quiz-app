// {
//     "id": 0,
//     "name": "string",
//     "description": "string",
//     "createdAt": "2023-01-23T01:05:42.535Z",
//     "updatedAt": "2023-01-23T01:05:42.535Z",
//     "trueFalse": [
//       {
//         "id": 0,
//         "type": "TRUE_FALSE",
//         "question": "string",
//         "description": "string",
//         "answer": true,
//         "tags": [
//           {
//             "id": 0,
//             "name": "string",
//             "createdAt": "2023-01-23T01:05:42.535Z",
//             "updatedAt": "2023-01-23T01:05:42.535Z"
//           }
//         ]
//       }
//     ],
//     "multipleChoice": [
//       {
//         "id": 0,
//         "question": "string",
//         "type": "MULTIPLE_CHOICE",
//         "description": "string",
//         "options": [
//           "string"
//         ],
//         "answer": 0,
//         "tags": [
//           {
//             "id": 0,
//             "name": "string",
//             "createdAt": "2023-01-23T01:05:42.535Z",
//             "updatedAt": "2023-01-23T01:05:42.535Z"
//           }
//         ]
//       }
//     ],
//     "shortAnswer": [
//       {
//         "id": 0,
//         "question": "string",
//         "type": "SHORT_ANSWER",
//         "description": "string",
//         "answer": "string",
//         "tags": [
//           {
//             "id": 0,
//             "name": "string",
//             "createdAt": "2023-01-23T01:05:42.536Z",
//             "updatedAt": "2023-01-23T01:05:42.536Z"
//           }
//         ]
//       }
//     ],
//     "multipleSelect": [
//       {
//         "id": 0,
//         "question": "string",
//         "type": "MULTIPLE_CHOICE",
//         "description": "string",
//         "options": [
//           "string"
//         ],
//         "answer": 0,
//         "tags": [
//           {
//             "id": 0,
//             "name": "string",
//             "createdAt": "2023-01-23T01:05:42.536Z",
//             "updatedAt": "2023-01-23T01:05:42.536Z"
//           }
//         ]
//       }
//     ]
//   }

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
}

export interface MultipleChoice {
    id: number;
    question: string;
    type: QuestionType;
    description: string;
    options: string[];
    answer: number;
    tags: Tag[];
}

export interface ShortAnswer {
    id: number;
    question: string;
    type: QuestionType;
    description: string;
    answer: string;
    tags: Tag[];
}

export interface MultipleSelect {
    id: number;
    question: string;
    type: QuestionType;
    description: string;
    options: string[];
    answer: number;
    tags: Tag[];
}

export interface Tag {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum QuestionType {
    TRUE_FALSE = 'TRUE_FALSE',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    SHORT_ANSWER = 'SHORT_ANSWER',
    MULTIPLE_SELECT = 'MULTIPLE_SELECT'
}