import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from './alert.entity';
import { AlertService } from './alert.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [
    MatIconModule,
    CommonModule,
  ],
  standalone: true
})
export class AlertComponent implements OnInit, OnDestroy {

  private _subscription!: Subscription;
  @ViewChild('alertId', { static: true }) alertRef!: ElementRef;

  alert!: Alert | null;

  constructor(
    private readonly _alertService: AlertService) { }

  ngOnInit() {
    this._subscription = this._alertService.alert$.subscribe(alert => {
      this.alert = alert;
      if (this.alert !== null) {
        this.alertRef?.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  closeAlert() {
    this._alertService.clear();
    this.alert = null;
  }

}
