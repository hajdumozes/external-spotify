import { TrackService } from './../../services/track.service';
import { SpotifyService } from './../../../spotify.service';
import { Component, Input } from '@angular/core';
import { SpotifyTrack } from '../../models/spotify-track.model';
import Utils from './../../../util/Utils';

@Component({
  selector: 'app-album-icon',
  template: `
    <span>
      <button
        mat-icon-button
        (click)="saveAlbums(tracks)"
        matTooltip="Save album to your library"
      >
        <mat-icon [ngClass]="{ saved: allSaved(tracks) }">album</mat-icon>
      </button>
    </span>
  `,
  styleUrls: ['./album-icon.component.css', './../../local-tags.component.css'],
})
export class AlbumIconComponent {
  @Input() tracks: SpotifyTrack[];
  @Input() trackService: TrackService;

  constructor(private spotifyService: SpotifyService) {}

  public saveAlbums(tracks: SpotifyTrack[]) {
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    const ids: string[] = tracks.map((track) => track.albumId);
    const idChunks: string[][] = Utils.chunkArray(ids, 50);
    idChunks.forEach((idChunk) =>
      this.spotifyService.saveAlbums(idChunk.join(',')).subscribe(() => {
        this.setAlbumsSaved(tracks);
      })
    );
  }

  public setAlbumsSaved(tracks: SpotifyTrack[]) {
    tracks.forEach((track) => (track.albumSaved = true));
    this.trackService.updateStorage(tracks);
  }

  public allSaved(tracks: SpotifyTrack[]) {
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    return tracks.every((track) => track.albumSaved);
  }
}
