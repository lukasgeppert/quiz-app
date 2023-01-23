import { createReducer } from "@ngrx/store";
import { on } from "@ngrx/store";
import { increment, decrement, reset, start, end } from "./score.actions";
import { Score } from "./score.entity";

export const initialState: Score = {
    examName: '',
    score: 0,
    startTime: null,
    endTime: null,
    correct: 0,
    incorrect: 0,
    isNegaiveMarking: false,
}

export const scoreReducer = createReducer(
    initialState,
    on(start, (state, { exam }) => {
        return {
            ...state,
            examName: exam.name,
            startTime: new Date(),
            isNegaiveMarking: exam.isNegativeMarking,
        }
    }),
    on(reset, _ => initialState),

    on(increment, (state, { points }) => ({
        ...state,
        score: state.score + points,
        correct: state.correct + 1,
    })),

    on(decrement, (state, { points }) => {
        if (state.isNegaiveMarking) {
            return {
                ...state,
                score: state.score - points,
                incorrect: state.incorrect + 1,
            }
        }
        return {
            ...state,
            incorrect: state.incorrect + 1,
        }
    }),
    
    on(end, state => ({
        ...state,
        endTime: new Date(),
    })),

);