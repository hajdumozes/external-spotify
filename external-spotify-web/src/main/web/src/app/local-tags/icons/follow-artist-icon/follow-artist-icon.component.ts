import { SpotifyArtist } from './../../spotify-artist.model';
import { SpotifyTrack } from './../../spotify-track.model';
import { SpotifyService } from './../../../spotify.service';
import { Component, Input } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Utils from './../../../util/Utils';

@Component({
  selector: 'app-follow-artist-icon',
  template: `
    <span>
      <fa-icon
        title="Follow artist"
        class="icon"
        [icon]="faUserPlus"
        (click)="followArtists(tracks)"
        *ngIf="!loading"
        [ngClass]="{ followed: allFollowed(tracks) }"
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
  @Input() tracks: SpotifyTrack[];
  public loading: boolean = false;

  constructor(private spotifyService: SpotifyService) {}

  public followArtists(tracks: SpotifyTrack[]) {
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    this.loading = true;
    const artists: SpotifyArtist[][] = tracks.map((track) => track.artists);
    const mergedArtists: SpotifyArtist[] = [].concat.apply([], artists);
    const artistIds: string[] = mergedArtists.map((artist) => artist.id);
    const idChunks: string[][] = Utils.chunkArray(artistIds, 50);
    idChunks.forEach((idChunk) =>
      this.spotifyService.followArtists(idChunk.join(',')).subscribe(() => {
        this.loading = false;
        this.setArtistsFollowed(tracks);
      })
    );
  }

  public setArtistsFollowed(tracks: SpotifyTrack[]) {
    tracks.forEach((track) =>
      track.artists.forEach((artist) => (artist.followed = true))
    );
  }

  public allFollowed(tracks: SpotifyTrack[]) {
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    return tracks.every((track) => track.artistsFollowed);
  }
}
