import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthRefreshTokenInterceptor implements HttpInterceptor {
    isRefreshingToken = false;

    constructor(
        private readonly authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({ withCredentials: true });
        return next.handle(req)
            .pipe(
                catchError((err: any) => {

                    if (
                        err instanceof HttpErrorResponse
                        && err.status === 401
                        && this.isRefreshingToken === false
                        && !req.url.includes('/auth/refresh')
                        && !req.url.includes('/auth/login')) {
                        return this.handle401Error(req, next);
                    }
                    return throwError(() => err);
                })
            );
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        this.isRefreshingToken = true;
        return this.authService.refreshToken()
            .pipe(
                catchError((err: any) => {
                    this.authService.logout();
                    return throwError(() => err);
                }),
                switchMap(() => {
                    this.isRefreshingToken = false;
                    return next.handle(req);
                })
            );
    }

}