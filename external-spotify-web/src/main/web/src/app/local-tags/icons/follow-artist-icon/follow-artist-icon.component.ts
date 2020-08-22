import { TrackService } from './../../track.service';
import { SpotifyArtist } from './../../spotify-artist.model';
import { SpotifyTrack } from './../../spotify-track.model';
import { SpotifyService } from './../../../spotify.service';
import { Component, Input } from '@angular/core';
import Utils from './../../../util/Utils';

@Component({
  selector: 'app-follow-artist-icon',
  template: `
    <span>
      <button
        mat-icon-button
        (click)="followArtists(tracks)"
        matTooltip="Follow artists of track"
      >
        <mat-icon [ngClass]="{ followed: allFollowed(tracks) }"
          >person_add_alt_1</mat-icon
        >
      </button>
    </span>
  `,
  styleUrls: [
    './follow-artist-icon.component.css',
    './../../local-tags.component.css',
  ],
})
export class FollowArtistIconComponent {
  @Input() tracks: SpotifyTrack[];
  @Input() trackService: TrackService;

  constructor(private spotifyService: SpotifyService) {}

  public followArtists(tracks: SpotifyTrack[]) {
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    const artists: SpotifyArtist[][] = tracks.map((track) => track.artists);
    const mergedArtists: SpotifyArtist[] = [].concat.apply([], artists);
    const artistIds: string[] = mergedArtists.map((artist) => artist.id);
    const idChunks: string[][] = Utils.chunkArray(artistIds, 50);
    idChunks.forEach((idChunk) =>
      this.spotifyService.followArtists(idChunk.join(',')).subscribe(() => {
        this.setArtistsFollowed(tracks);
      })
    );
  }

  public setArtistsFollowed(tracks: SpotifyTrack[]) {
    tracks.forEach((track) =>
      track.artists.forEach((artist) => (artist.followed = true))
    );
    this.trackService.updateStorage(tracks);
  }

  public allFollowed(tracks: SpotifyTrack[]) {
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    return tracks.every((track) => track.artistsFollowed);
  }
}
