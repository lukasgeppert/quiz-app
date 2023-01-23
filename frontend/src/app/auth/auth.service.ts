import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { StorageService } from '../shared/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
  ) { }

  apiBaseUrl = environment.API_BASE_URL;
  key = "auth_token";


  login(email: string, password: string) {
    return this.http.post(`${this.apiBaseUrl}/auth/login`, { email, password }).pipe(
      tap((response: any) => {
        this.storageService.setItem(this.key, response);
      })
    );
  }

  googleLogin(idToken: string) {

    return this.http.get(`${this.apiBaseUrl}/auth/google/login`, {
      headers: {
        idToken
      }
    }).pipe(
      tap((response: any) => {
        this.storageService.setItem(this.key, response);
      })
    )
  }


  register(email: string, password: string) {
    return this.http.post(`${this.apiBaseUrl}/auth/register`, { email, password });
  }


  logout() {
    return this.http.post(`${this.apiBaseUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.storageService.removeItem(this.key);
      }));
  }

  isLoggedIn() {
    return this.storageService.getItem(this.key) != null;
  }

  refreshToken() {
    return this.http.post(`${this.apiBaseUrl}/auth/refresh`, {}).pipe(
      tap((response: any) => {
        this.storageService.setItem(this.key, response.token);
      })
    );
  }

  generateOtp(email: string) {
    return this.http.post(`${this.apiBaseUrl}/auth/otp/generate`, { email });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post(`${this.apiBaseUrl}/auth/otp/verify`, { email }, {
      headers: {
        otp
      }
    });
  }

  changePassword(email: string, password: string, otp: string) {
    return this.http.post(`${this.apiBaseUrl}/auth/change-password`, { email, password }, {
      headers: {
        otp
      }
    });
  }
}
