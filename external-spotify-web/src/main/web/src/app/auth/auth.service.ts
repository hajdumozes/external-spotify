import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface AuthResponseDataStorage {
  _accessToken: string;
  _refreshToken: string;
  _tokenExpirationDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(this.getUserFromStorage());

  constructor(private http: HttpClient) {}

  login() {
    this.getUri().subscribe((url) => {
      window.location.href = url;
    });
  }

  autoLogin() {
    return localStorage.getItem('code');
  }

  public initializeTokens(code: string) {
    return this.http
      .post<AuthResponseData>('/initialize-tokens', code)
      .pipe(tap((resData) => this.saveUserCredentials(resData)));
  }

  private getUri() {
    return this.http.get(`/spotify-uri`, { responseType: 'text' });
  }

  private getUserFromStorage() {
    const userObject: AuthResponseDataStorage = JSON.parse(
      localStorage.getItem('user')
    );
    if (userObject) {
      return new User(
        userObject._accessToken,
        userObject._refreshToken,
        userObject._tokenExpirationDate
      );
    }
  }

  public saveUserCredentials(auth: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + auth.expiresIn * 1000
    );
    const user = new User(auth.accessToken, auth.refreshToken, expirationDate);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
