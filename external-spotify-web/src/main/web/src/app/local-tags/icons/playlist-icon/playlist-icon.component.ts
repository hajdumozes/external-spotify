import { SpotifyTrack } from './../../spotify-track.model';
import { Component, Input } from '@angular/core';
import { faListUl } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlist-icon',
  template: `
    <fa-icon title="Add to playlist" class="icon" [icon]="faListUl"></fa-icon>
  `,
  styleUrls: [
    './playlist-icon.component.css',
    './../../local-tags.component.css',
  ],
})
export class PlaylistIconComponent {
  faListUl = faListUl;
  @Input() tracks: SpotifyTrack[];

  constructor() {}
}
