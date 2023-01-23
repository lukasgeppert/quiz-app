import { createAction } from "@ngrx/store";
import { Exam } from "src/app/exam/exam.entity";

export const start = createAction('[Score] Start Exam', (exam: Exam) => ({exam}));
export const increment = createAction('[Score] Increment', (points: number) => ({points}));
export const decrement = createAction('[Score] Decrement', (points: number) => ({points}));
export const reset = createAction('[Score] Reset');
export const end = createAction('[Score] End Exam');
