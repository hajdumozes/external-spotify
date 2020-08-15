import { SpotifyService } from './../../../spotify.service';
import { SpotifyTrack } from './../../spotify-track.model';
import { Component, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-like-icon',
  template: `
    <span>
      <fa-icon
        title="Save to your liked songs"
        class="heart-icon icon"
        [icon]="faHeart"
        (click)="likeTrack(track)"
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
  @Input() public track: SpotifyTrack;
  constructor(private spotifyService: SpotifyService) {}

  public likeTrack(track: SpotifyTrack) {
    this.loading = true;
    this.spotifyService.likeTracks(track.trackId).subscribe(() => {
      this.loading = false;
      this.liked = true;
    });
  }
}
