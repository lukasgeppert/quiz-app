import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { length } from 'class-validator';
import { lengthValidator, passwordMatchvalidator, patternValidator } from '../shared/form/form.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;


  getType = (type: boolean) => type ? "text" : "password";


  tooglePasswordVisibility = () => {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toogleConfirmPasswordVisibility = () => {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }



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

  get otp() { return this.changePasswordForm.controls.otp; }
  get password() { return this.changePasswordForm.controls.password; }
  get confirmPassword() { return this.changePasswordForm.controls.confirmPassword; }


  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    console.log(this.changePasswordForm.value);
  }
}
