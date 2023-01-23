import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exam } from './exam.entity';
import { ExamService } from './exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit, OnDestroy {
  exams: Exam[] = [];

  examSubscription!: Subscription;

  constructor(
    private examService: ExamService,
    private router: Router) { }

  ngOnInit() {
    this.examSubscription =  this.examService.findAll().subscribe(exams => {
      this.exams = exams;
    });
  }

  ngOnDestroy() {
    this.examSubscription.unsubscribe();
  }

  examDetail(exam: Exam) {
    this.router.navigate(['/exams', exam.id]);
  }


}
