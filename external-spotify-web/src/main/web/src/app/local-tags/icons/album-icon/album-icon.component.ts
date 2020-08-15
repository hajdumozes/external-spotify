import { SpotifyService } from './../../../spotify.service';
import { Component, Input } from '@angular/core';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { SpotifyTrack } from '../../spotify-track.model';
import Utils from './../../../util/Utils';

@Component({
  selector: 'app-album-icon',
  template: `
    <span>
      <fa-icon
        title="Save album to your library"
        class="icon"
        [icon]="faVinyl"
        (click)="saveAlbums(tracks)"
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
  @Input() tracks: SpotifyTrack[];

  constructor(private spotifyService: SpotifyService) {}

  public saveAlbums(tracks: SpotifyTrack[]) {
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    this.loading = true;
    const ids: string[] = tracks.map((track) => track.albumId);
    const idChunks: string[][] = Utils.chunkArray(ids, 50);
    idChunks.forEach((idChunk) =>
      this.spotifyService.saveAlbums(idChunk.join(',')).subscribe(() => {
        this.loading = false;
        this.saved = true;
      })
    );
  }
}
