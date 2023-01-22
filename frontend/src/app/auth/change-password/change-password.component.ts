import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { length } from 'class-validator';
import { AlertService } from 'src/app/alert/alert.service';
import { AuthService } from '../auth.service';
import { lengthValidator, passwordMatchvalidator, patternValidator } from '../shared/form/form.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  otpSent = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  getType = (type: boolean) => type ? "text" : "password";


  tooglePasswordVisibility = () => {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toogleConfirmPasswordVisibility = () => {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }



  getOtpForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
   
  });

  changePasswordForm = new FormGroup({
    otp: new FormControl('', [
      Validators.required
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

  get email() { return this.getOtpForm.controls.email; }

  get otp() { return this.changePasswordForm.controls.otp; }
  get password() { return this.changePasswordForm.controls.password; }
  get confirmPassword() { return this.changePasswordForm.controls.confirmPassword; }


  changePassword() {
    const email = this.email.value;
    
    if (this.changePasswordForm.invalid || email === null) {
      return;
    }

    const { otp, password } = this.changePasswordForm.value;
    this.authService.changePassword(email, password as string,  otp as string,).subscribe({
      next: () => {
        this.alertService.success({
          message: "Password changed successfully",
          title: "Success"
        });
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.alertService.error({
          message: error.error.message,
          title: "Error"
        });
      }
    });

    
  }

  changeEmail() {
    this.otpSent = false;
  }


  generateOtp() {
    if (this.getOtpForm.invalid) {
     return;
    }
    const email = this.email.value;
    this.authService.generateOtp(email as string).subscribe({
      next: () => {
        this.otpSent = true;
        this.alertService.clear();
      },
      error: (error) => {
        this.alertService.error({
          message: error.error.message,
          title: "Error"
        });
      }
    });
  }


}
