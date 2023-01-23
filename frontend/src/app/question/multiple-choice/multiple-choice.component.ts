import { Component, Input } from '@angular/core';
import { MultipleChoice } from 'src/app/exam/exam-detail/exam-detail.entity';

@Component({
  selector: 'question-multiple-choice',
  templateUrl: './multiple-choice.component.html',
})
export class MultipleChoiceComponent {
  @Input() question!: MultipleChoice;  

  labelPosition: number = -10;

  isCorrect?: boolean;


  onSelect(userAnswer: number) {
    this.isCorrect =  (this.question.answer === userAnswer);
  }

}
