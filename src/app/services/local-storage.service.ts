import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage;
  constructor() {
    this.localStorage = window.localStorage;
  }
  cleanLocal() {
    localStorage.clear();
  }
  removeLocal(key: string) {
    this.localStorage.removeItem(key);
  }
  getLocal(key: string) {
    return this.localStorage.getItem(key);
  }
  setLocal(key: string, value: string) {
    return this.localStorage.setItem(key, value);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
