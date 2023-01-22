import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { AuthService } from '../auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared/form/form.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private alertService: AlertService) { }


  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required),
  })

  next = {
    next: () => {
      this.router.navigate(['/']);
    },
    error: (error: any) => {
      this.alertService.error({
        message: error.error.message,
        title: 'Login failed'
      })
    }
  }


  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get email() { return this.loginForm.controls.email; }

  get password() { return this.loginForm.controls.password; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(
      email as string,
      password as string
    ).subscribe(this.next)
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe(async (data) => {
      const idToken = data.idToken;
      this.authService.googleLogin(idToken).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
          this.alertService.error({
            message: error.error.message,
            title: 'Login failed'
          })
        }
      });
    });
  }

}
