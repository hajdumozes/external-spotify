import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit {
  title = 'np-app';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const code = this.auth.autoLogin();
    if (!code) {
      // it needs to init once right now
      this.router.navigate(['spotify-uri-callback']);
      this.auth.login();
    }
  }
}
