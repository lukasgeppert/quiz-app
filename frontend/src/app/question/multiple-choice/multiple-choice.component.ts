import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MultipleChoice } from 'src/app/exam/exam-detail/exam-detail.entity';
import { ScoreService } from 'src/app/shared/score/score.service';

@Component({
  selector: 'question-multiple-choice',
  templateUrl: './multiple-choice.component.html',
})
export class MultipleChoiceComponent {
  @Input() question!: MultipleChoice;  

  labelPosition: number = -10;

  constructor(
    private scoreService: ScoreService,
    private cd : ChangeDetectorRef,
    ) { }

  isCorrect?: boolean;


  onSelect(userAnswer: number) {
    this.isCorrect =  (this.question.answer === userAnswer);
    if (this.isCorrect) {
      this.scoreService.incrementScore();
    }
    this.cd.detectChanges();
  }

}
