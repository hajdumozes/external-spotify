import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit {
  title = 'np-app';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const code = this.auth.autoLogin();
    if (!code) {
      this.auth.login();
    }
  }
}
