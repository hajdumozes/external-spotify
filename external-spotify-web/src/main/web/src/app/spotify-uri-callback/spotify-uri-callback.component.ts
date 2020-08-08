import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-spotify-uri-callback',
  template: `
    <p>
      spotify-uri-callback works!
    </p>
  `,
  styleUrls: ['./spotify-uri-callback.component.css'],
  providers: [],
})
export class SpotifyUriCallbackComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParams.code;
    localStorage.setItem('code', code);
    if (!localStorage.getItem('user')) {
      this.auth.initializeTokens(code).subscribe();
    }
    this.router.navigate(['local-tags']);
  }
}
