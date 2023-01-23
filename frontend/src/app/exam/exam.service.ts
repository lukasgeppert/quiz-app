import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ExamDetail } from './exam-detail/exam-detail.entity';
import { Exam } from './exam.entity';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  apiBaseUrl = environment.API_BASE_URL;
  
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Exam[]>(this.apiBaseUrl + '/exams');
  }


  findOne(id: number) {
    return this.http.get<ExamDetail>(this.apiBaseUrl + `/exams/${id}`);
  }
}
