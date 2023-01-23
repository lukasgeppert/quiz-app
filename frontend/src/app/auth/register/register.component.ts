import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { AuthService } from '../auth.service';
import { lengthValidator, passwordMatchvalidator, patternValidator } from '../shared/form.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {


  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router) { }

  isPasswordVisible = false;
  isConfirmPasswordVisible = false;


  getType = (type: boolean) => type ? "text" : "password";


  tooglePasswordVisibility = () => {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toogleConfirmPasswordVisibility = () => {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }



  registerForm = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      lengthValidator(8),
      patternValidator(/\d/, { patternNumber: true }),
      patternValidator(/[A-Z]/, { patternUppercase: true }),
      patternValidator(/[a-z]/, { patternLowercase: true }),
      patternValidator(/[!@#$%^&*(),.?":{}|<>]/, { patternSpecial: true }),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ]),
  }, { validators: passwordMatchvalidator });


  passwordErrorMessages: { [key: string]: string } = {
    patternNumber: "Password must contain number",
    patternUppercase: "Password must contain uppercase letter",
    patternLowercase: "Password must contain lowercase letter",
    patternSpecial: "Password must contain special character",
    length: "Password length must be >= 8 ",
    passwordMismatch: "Both Password must match",
  };

  isPasswordError = (errorName: string) => {
    return this.password.hasError(errorName);
  }

  get password() { return this.registerForm.controls.password; }
  get email() { return this.registerForm.controls.email; }
  get confirmPassword() { return this.registerForm.controls.confirmPassword; }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const { email, password } = this.registerForm.value;

    this.authService.register(
      email as string,
      password as string,
    ).subscribe({
      next: () => {
        this.alertService.success({
          message: "Registration successful",
          title: "Success"
        })
        this.router.navigate(["/auth/login"]);
      },
      error: (error: any) => {
        this.alertService.error({
          message: error.error.message,
          title: "Registration failed"
        })
      }
    })
  }
}

