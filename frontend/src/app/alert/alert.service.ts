import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, Subject, Subscription } from 'rxjs';
import { Alert, AlertType } from './alert.entity';



interface AlertArgs {
  title?: string,
  message: string,
  keepAfterRouteChange?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AlertService implements OnInit, OnDestroy {
  private _alert = new BehaviorSubject<Alert | null>(null);
  private keepAfterRouteChange = false;

  alert$ = this._alert.asObservable().pipe(
    filter(alert => alert !== null));

  routeSubscription!: Subscription;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.routeSubscription = this.router.events.subscribe(() => {
      if (this.keepAfterRouteChange) {
        this.keepAfterRouteChange = false;
      } else {
        this._alert.next(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  success({ title, message, keepAfterRouteChange = false }: AlertArgs) {
    title = title || AlertType.Success;
    this.keepAfterRouteChange = keepAfterRouteChange;
    this._alert.next({
      type: AlertType.Success,
      icon: 'check_circle',
      title, message
    });
  }

  error({ title, message, keepAfterRouteChange = false }: AlertArgs) {
    title = title || AlertType.Error;
    this.keepAfterRouteChange = keepAfterRouteChange;
    this._alert.next({
      type: AlertType.Error,
      icon: 'error',
      title, message
    });
  }

  info({ title, message, keepAfterRouteChange = false }: AlertArgs) {
    title = title || AlertType.Info;
    this.keepAfterRouteChange = keepAfterRouteChange;
    this._alert.next({
      type: AlertType.Info,
      icon: 'info',
      title, message
    });
  }

  warn({ title, message, keepAfterRouteChange = false }: AlertArgs) {
    title = title || AlertType.Warning;
    this.keepAfterRouteChange = keepAfterRouteChange;
    this._alert.next({
      type: AlertType.Warning,
      icon: 'warning',
      title, message
    });
  }

  clear() {
    this._alert.next(null);
  }

}
