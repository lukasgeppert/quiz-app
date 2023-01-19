import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: Storage = sessionStorage;

  constructor() { }


  clear() {
    this.storage.clear();
  }

  getItem(key: string) {
    return JSON.parse(this.storage.getItem(key) || 'null');
  }

  setItem(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

}
