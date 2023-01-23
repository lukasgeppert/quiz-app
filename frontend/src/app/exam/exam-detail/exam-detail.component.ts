import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScoreService } from 'src/app/shared/score/score.service';
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
    private router: Router,
    private scoreService: ScoreService,
  ) { }

  exam: ExamDetail | null = null;
  examSubscription!: Subscription;


  get examId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.examSubscription = this.examService.findOne(this.examId).subscribe(exam => {
      this.exam = exam;
      this.scoreService.setExamName(exam.name);
      this.scoreService.startExam();
    });
  }

  ngOnDestroy() {
    this.examSubscription.unsubscribe();
  }

  onSubmit() {
    this.scoreService.endExam();
    this.router.navigate(['/score']);
  }

}
