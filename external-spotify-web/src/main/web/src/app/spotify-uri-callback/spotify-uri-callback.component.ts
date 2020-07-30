import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParams.code;
    localStorage.setItem('code', code);
  }
}
