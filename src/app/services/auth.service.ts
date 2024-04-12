import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../common/Login';
import { Register } from '../common/Register';
import { Customer } from '../common/Customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/api/auth/';
  currentUser: Customer | null = null;
  private _isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  private loadCurrentUser() {
    const userJson = sessionStorage.getItem('currentUser');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
      this._isLoggedIn = true;
    }
  }

  login(userData: Login): Observable<any> {
    return this.http.post(this.url + 'signin', userData).pipe(
      tap((response: any) => {
        if (response && response.user) {
          this.currentUser = response.user;
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this._isLoggedIn = true;
        }
      })
    );
  }

  register(user: Register): Observable<any> {
    return this.http.post(this.url + 'signup', user);
  }

  forgotPassword(email: string) {
    return this.http.post(this.url + 'send-mail-forgot-password-token', email);
  }

  public getAccessToken(): Observable<{ accessToken: string }> {
    return this.http.get<{ accessToken: string }>('/getAccessToken');
  }
}
