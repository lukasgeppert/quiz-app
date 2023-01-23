import { createReducer } from "@ngrx/store";
import { on } from "@ngrx/store";
import { increment, decrement, reset, start , end, setExamName} from "./score.actions";
import { Score } from "./score.entity";

export const initialState: Score= {
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
    on(start, state => ({
            ...state,
            startTime: new Date(),
            endTime: null,
        })),
    on(increment, state => ({
            ...state,
            score: state.score + 1,
            correct: state.correct + 1,
    })),
    on(decrement, state => {
        if (state.isNegaiveMarking) {
            return {
                ...state,
                score: state.score - 1,
                incorrect: state.incorrect + 1,
            }
        }
        return {
            ...state,
            incorrect: state.incorrect + 1,
        }  
    }),
    on(reset, state => ({
            ...state,
            score: 0,
            endTime: new Date(),
    })),

    on(end, state => ({
            ...state,
            endTime: new Date(),
    })),
    on(setExamName, (state, {examName}) => ({
            ...state,
            examName,
    })),

);