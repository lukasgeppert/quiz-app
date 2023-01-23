import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, end, increment, reset, start } from './score.actions';
import { Score } from './score.entity';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  score$: Observable<Score>;
  constructor(private score: Store<{ score: Score }>) {
    this.score$ = score.select('score');
  }

  getScore() {
    return this.score$;
  }

  incrementScore() {
    this.score.dispatch(increment());
  }

  decrementScore() {
    this.score.dispatch(decrement());
  }

  resetExam() {
    this.score.dispatch(reset());
  }

  startExam() {
    this.score.dispatch(start());
  }

  endExam() {
    this.score.dispatch(end());
  }

  setExamName(examName: string) {
    this.score.dispatch({type: '[Score] Set Exam Name', examName});
  }
}
