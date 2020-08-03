import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();

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
    return this.http.post<AuthResponseData>('/initialize-tokens', code).pipe(
      tap((resData) => {
        const expirationDate = new Date(
          new Date().getTime() + resData.expiresIn * 1000
        );
        const user = new User(
          resData.accessToken,
          resData.refreshToken,
          expirationDate
        );
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  private getUri() {
    return this.http.get(`/spotify-uri`, { responseType: 'text' });
  }
}
