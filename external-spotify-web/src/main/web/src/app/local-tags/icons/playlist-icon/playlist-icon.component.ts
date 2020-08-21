import { SpotifyService } from './../../../spotify.service';
import { SpotifyPlaylist } from './../../spotify-playlist.model';
import { SpotifyTrack } from './../../spotify-track.model';
import { Component, Input, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Utils from '../../../util/Utils';

interface PlaylistModalData {
  tracks: SpotifyTrack[];
  playlists: SpotifyPlaylist[];
}

@Component({
  selector: 'app-playlist-icon',
  template: `
    <button mat-icon-button (click)="openDialog()">
      <mat-icon>playlist_add</mat-icon>
    </button>
  `,
  styleUrls: [
    './playlist-icon.component.css',
    './../../local-tags.component.css',
  ],
})
export class PlaylistIconComponent {
  @Input() tracks: SpotifyTrack[];
  @Input() playlists: SpotifyPlaylist[];

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(PlaylistModal, {
      width: '350px',
      data: { tracks: this.tracks, playlists: this.playlists },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}

@Component({
  selector: 'playlist-modal',
  templateUrl: 'playlist-icon-modal.component.html',
  styleUrls: ['./../../local-tags.component.css'],
})
export class PlaylistModal {
  public selectedPlaylists: SpotifyPlaylist[] = [];
  constructor(
    public dialogRef: MatDialogRef<PlaylistIconComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlaylistModalData,
    private spotifyService: SpotifyService
  ) {}

  isActive(playlist: SpotifyPlaylist) {
    let active = Utils.findIndexOf(this.selectedPlaylists, playlist) > -1;
    return active;
  }

  selectRow(playlist: SpotifyPlaylist) {
    const indexOf = Utils.findIndexOf(this.selectedPlaylists, playlist);
    if (indexOf > -1) {
      this.selectedPlaylists.splice(indexOf, 1);
    } else {
      this.selectedPlaylists.push(playlist);
    }
  }

  async onAdd(playlists: SpotifyPlaylist[]) {
    if (!Array.isArray(this.data.tracks)) {
      this.data.tracks = [this.data.tracks];
    }
    const ids: string[] = this.data.tracks.map((track) => track.uri);
    const idChunks: string[][] = Utils.chunkArray(ids, 50);
    playlists.forEach((playlist) => {
      idChunks.forEach(
        async (idChunk) =>
          await this.spotifyService
            .addToPlaylist(playlist.id, idChunk.join(','))
            .toPromise()
      );
      this.dialogRef.close();
    });
  }
}
