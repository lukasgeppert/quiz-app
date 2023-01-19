import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { StorageService } from '../shared/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private socialService: SocialAuthService,
  ) { }

  apiBaseUrl = environment.API_BASE_URL;  
  key = "auth_token";


  login(email: string, password: string) {
    return this.http.post(`${this.apiBaseUrl}/auth/login`, { email, password }).pipe(
      tap((response: any) => {
        this.storageService.setItem(this.key, response.token);
      })
    );
  }
  async googleLogin() {
    const user: SocialUser = await this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID,);

    return this.http
    .post(
      `${this.apiBaseUrl}/auth/google/callback`,
      {
        name: user.name,
        accessToken: user.authToken,
        authorizationCode: user.authorizationCode,
        type: 'web',
      },
    )
    .pipe(
      take(1),
      tap((response: any) => {
        this.storageService.setItem(this.key, response.token);
      })
    );
  }


  register(email: string, password: string) {
    return this.http.post(`${this.apiBaseUrl}/auth/register`, { email, password })
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
}
