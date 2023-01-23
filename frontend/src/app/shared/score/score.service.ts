import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/exam/exam.entity';
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

  incrementScore(points: number) {
    this.score.dispatch(increment(points));
  }

  decrementScore(points: number) {
    this.score.dispatch(decrement(points));
  }

  resetExam() {
    this.score.dispatch(reset());
  }

  startExam(exam: Exam) {
    this.score.dispatch(start(exam));
  }

  endExam() {
    this.score.dispatch(end());
  }

}
