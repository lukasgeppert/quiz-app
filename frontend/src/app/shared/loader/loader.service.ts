import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  _isLoading = new Subject<boolean>();
  
  show() {
    this._isLoading.next(true);
  }

  hide() {
    this._isLoading.next(false);
  }

  get isLoading() {
    return this._isLoading.asObservable();
  }
  
}
