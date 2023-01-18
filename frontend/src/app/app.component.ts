import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AlertType } from './alert/alert.entity';
import { AlertService } from './alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quiz App';

  constructor(
    titleService: Title,
    metaService: Meta,
    private readonly _alertService: AlertService
  ) {
    this._alertService.info({ 
      title: "Welcome to Quiz App",
      message: "This app uses cookies to ensure you get the best experience on our website.", 
    });

    titleService.setTitle(this.title);
    metaService.addTags([
      { name: 'author', content: 'Quiz App' },
      { name: 'keywords', content: 'Quiz App, Angular, Nest js' },
      { name: 'description', content: 'Quiz App' },
    ]);
  }



}
