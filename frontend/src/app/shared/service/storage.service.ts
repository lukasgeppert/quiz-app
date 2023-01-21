import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: Storage = localStorage;

  constructor() { }


  clearAll() {
    this.storage.clear();
  }

  getItem(key: string) {
    return JSON.parse(this.storage.getItem(key) || 'null');
  }

  setItem(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  exists(key: string) {
    return this.getItem(key) != null;
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

}
