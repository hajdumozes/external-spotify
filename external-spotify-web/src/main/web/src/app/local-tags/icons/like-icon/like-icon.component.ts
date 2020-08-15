import { SpotifyService } from './../../../spotify.service';
import { SpotifyTrack } from './../../spotify-track.model';
import { Component, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Utils from './../../../util/Utils';

@Component({
  selector: 'app-like-icon',
  template: `
    <span>
      <fa-icon
        title="Save to your liked songs"
        class="heart-icon icon"
        [icon]="faHeart"
        (click)="likeTracks(tracks)"
        *ngIf="!loading"
        [ngClass]="{ liked: liked }"
      ></fa-icon>
      <mat-spinner
        [diameter]="17"
        color="primary"
        *ngIf="loading"
      ></mat-spinner>
    </span>
  `,
  styleUrls: ['./like-icon.component.css', './../../local-tags.component.css'],
})
export class LikeIconComponent {
  public loading: boolean = false;
  public liked: boolean = false;
  public faHeart = faHeart;
  @Input() public tracks: SpotifyTrack[];
  constructor(private spotifyService: SpotifyService) {}

  public likeTracks(tracks: SpotifyTrack[]) {
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    this.loading = true;
    const ids: string[] = tracks.map((track) => track.trackId);
    const idChunks: string[][] = Utils.chunkArray(ids, 50);
    idChunks.forEach((idChunk) =>
      this.spotifyService.likeTracks(idChunk.join(',')).subscribe(() => {
        this.loading = false;
        this.liked = true;
      })
    );
  }
}
