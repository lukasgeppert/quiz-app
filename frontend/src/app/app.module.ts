import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './shared/loader/loader.component';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './shared/loader/loader.interceptor';
import { LoaderService } from './shared/loader/loader.service';
import { AlertComponent } from './shared/alert/alert.component';
import { CommonModule } from "@angular/common";
import { AuthGuard } from './auth/auth.gaurd';
import { AuthRefreshTokenInterceptor } from './auth/auth.interceptor';
import { StorageService } from './shared/service/storage.service';
import { ExamComponent } from './exam/exam.component';
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import { MultipleChoiceComponent } from './question/multiple-choice/multiple-choice.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { scoreReducer } from './shared/score/score.reducer';
import { ScoreComponent } from './shared/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamComponent,
    ExamDetailComponent,
    MultipleChoiceComponent,
    ScoreComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AlertComponent,
    LoaderComponent,
    StoreModule.forRoot({ score: scoreReducer })
  ],
  providers: [
    LoaderService,
    AuthGuard,
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRefreshTokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
