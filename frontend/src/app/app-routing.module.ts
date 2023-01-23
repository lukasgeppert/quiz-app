import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.gaurd';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import { ExamComponent } from './exam/exam.component';
import { ScoreComponent } from './shared/score/score.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  }, {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    title: 'Dashboard',
  }, {
    path: 'exams',
    component: ExamComponent,
    canActivate: [AuthGuard],
    title: 'Exam',
  }, {
    path: 'exams/:id',
    component: ExamDetailComponent,
    canActivate: [AuthGuard],
    title: 'Exam',
  }, {
    path: 'score',
    component: ScoreComponent,
    canActivate: [AuthGuard],
    title: 'Score',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
