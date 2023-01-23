import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertType } from './alert/alert.entity';
import { AlertService } from './alert/alert.service';
import { AuthService } from './auth/auth.service';
import { StorageService } from './shared/service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quiz App';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  
  constructor(
    titleService: Title,
    metaService: Meta,
    private readonly alertService: AlertService,
    private readonly storageService: StorageService,
    public readonly authService: AuthService,
    private readonly router: Router,
  ) {
    if (this.storageService.exists('cookie')) {
      this.alertService.info({
        title: "Welcome to Quiz App",
        message: "This app uses cookies to ensure you get the best experience on our website. By continuing to use this site, you agree to our use of cookies.",
        onClick: () => this.storageService.setItem('cookie', 'true'),
      });
    }


    titleService.setTitle(this.title);
    metaService.addTags([
      { name: 'author', content: 'Quiz App' },
      { name: 'keywords', content: 'Quiz App, Angular, Nest js' },
      { name: 'description', content: 'Quiz App' },
    ]);
  }


  logout() {
    this.authService.logout().subscribe(() => {
      this.sidenav.close();
      this.router.navigate(['/auth/login']);
    });
  }
}
