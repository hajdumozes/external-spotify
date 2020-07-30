import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login() {
    this.getUri().subscribe((url) => {
      window.location.href = url;
    });
  }

  autoLogin() {
    return localStorage.getItem('code');
  }

  private getUri() {
    return this.http.get(`/spotify-uri`, { responseType: 'text' });
  }
}
