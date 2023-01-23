import { createAction } from "@ngrx/store";

export const start = createAction('[Score] Start Exam');
export const increment = createAction('[Score] Increment');
export const decrement = createAction('[Score] Decrement');
export const reset = createAction('[Score] Reset');
export const end = createAction('[Score] End Exam');
export const setExamName = createAction('[Score] Set Exam Name', (examName: string) => ({examName}));