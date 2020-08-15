import { SpotifyService } from './../../../spotify.service';
import { Component, Input } from '@angular/core';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { SpotifyTrack } from '../../spotify-track.model';

@Component({
  selector: 'app-album-icon',
  template: `
    <span>
      <fa-icon
        title="Save album to your library"
        class="icon"
        [icon]="faVinyl"
        (click)="saveAlbum(track)"
        *ngIf="!loading"
        [ngClass]="{ saved: saved }"
      ></fa-icon>
      <mat-spinner
        [diameter]="17"
        color="primary"
        *ngIf="loading"
      ></mat-spinner>
    </span>
  `,
  styleUrls: ['./album-icon.component.css', './../../local-tags.component.css'],
})
export class AlbumIconComponent {
  public faVinyl = faRecordVinyl;
  public loading: boolean = false;
  public saved: boolean = false;
  @Input() track: SpotifyTrack;

  constructor(private spotifyService: SpotifyService) {}

  public saveAlbum(track: SpotifyTrack) {
    this.loading = true;
    this.spotifyService.saveAlbum(track.albumId).subscribe(() => {
      this.loading = false;
      this.saved = true;
    });
  }
}
