import { SpotifyTrack } from './../../spotify-track.model';
import { SpotifyService } from './../../../spotify.service';
import { Component, Input } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-follow-artist-icon',
  template: `
    <span>
      <fa-icon
        title="Follow artist"
        class="icon"
        [icon]="faUserPlus"
        (click)="followArtist(track)"
        *ngIf="!loading"
        [ngClass]="{ followed: followed }"
      ></fa-icon>
      <mat-spinner
        [diameter]="17"
        color="primary"
        *ngIf="loading"
      ></mat-spinner>
    </span>
  `,
  styleUrls: [
    './follow-artist-icon.component.css',
    './../../local-tags.component.css',
  ],
})
export class FollowArtistIconComponent {
  public faUserPlus = faUserPlus;
  @Input() track: SpotifyTrack;
  public loading: boolean = false;
  public followed: boolean = false;

  constructor(private spotifyService: SpotifyService) {}

  public followArtist(track: SpotifyTrack) {
    this.loading = true;
    const artistIds: string[] = track.artists.map((artist) => artist.id);
    this.spotifyService.followArtists(artistIds.join(',')).subscribe(() => {
      this.loading = false;
      this.followed = true;
    });
  }
}
