import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Score } from './score.entity';
import { ScoreService } from './score.service';

@Component({
  selector: 'app-store',
  templateUrl: './score.component.html',
  styleUrls: ['./store.component.scss']
})
export class ScoreComponent implements OnDestroy{
  score: Score = {
    examName: '',
    score: 0,
    correct: 0,
    incorrect: 0,
    startTime: null,
    endTime: null,
    isNegaiveMarking: false,
  };

  scoreSubscription!: Subscription;

  constructor(private scoreService: ScoreService) {
    this.scoreSubscription = this.scoreService.getScore().subscribe(score => {
      this.score = score;
    });
  }

  ngOnDestroy() {
    this.scoreService.resetExam();
    this.scoreSubscription.unsubscribe();
  }

}
