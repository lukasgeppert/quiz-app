import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {


  constructor(private titleService: Title) { }


  get title() {
    return this.titleService.getTitle();
  }

  isLogin() {
    return this.title !== 'Login';
  }

  isRegister() {
    return this.title !== 'Register';
  }

  isChangePassword() {
    return this.title !== 'Change Password';
  }
  



}
