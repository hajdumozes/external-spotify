import { TrackService } from './../../track.service';
import { SpotifyService } from './../../../spotify.service';
import { SpotifyTrack } from './../../spotify-track.model';
import { Component, Input } from '@angular/core';
import Utils from './../../../util/Utils';

@Component({
  selector: 'app-like-icon',
  template: `
    <span>
      <button
        mat-icon-button
        (click)="likeTracks(tracks)"
        matTooltip="Save to your liked songs"
      >
        <mat-icon [ngClass]="{ liked: allLiked(tracks) }">favorite</mat-icon>
      </button>
    </span>
  `,
  styleUrls: ['./like-icon.component.css', './../../local-tags.component.css'],
})
export class LikeIconComponent {
  @Input() public tracks: SpotifyTrack[];
  @Input() trackService: TrackService;

  constructor(private spotifyService: SpotifyService) {}

  public likeTracks(tracks: SpotifyTrack[]) {
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    const ids: string[] = tracks.map((track) => track.trackId);
    const idChunks: string[][] = Utils.chunkArray(ids, 50);
    idChunks.forEach((idChunk) =>
      this.spotifyService.likeTracks(idChunk.join(',')).subscribe(() => {
        this.setTracksLiked(tracks);
      })
    );
  }

  public setTracksLiked(tracks: SpotifyTrack[]) {
    tracks.forEach((track) => (track.liked = true));
    this.trackService.updateStorage(tracks);
  }

  public allLiked(tracks: SpotifyTrack[]) {
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    return tracks.every((track) => track.liked);
  }
}
