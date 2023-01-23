import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamService } from '../exam.service';
import { ExamDetail, MultipleChoice } from './exam-detail.entity';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
  ) { }

  exam: ExamDetail| null = null;
  examSubscription!: Subscription;


  get examId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.examSubscription = this.examService.findOne(this.examId).subscribe(exam => {
      this.exam = exam;
    });
  }

  ngOnDestroy() {
    this.examSubscription.unsubscribe();
  }

  onOptionChange(event: any, multipleChoice: MultipleChoice) {

  }

}
