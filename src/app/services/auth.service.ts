import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('userToken'); // Replace this with real authentication logic
  }
}