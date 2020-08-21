import { SpotifyPlaylist } from './../../spotify-playlist.model';
import { SpotifyTrack } from './../../spotify-track.model';
import { Component, Input, Inject } from '@angular/core';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
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
  faListUl = faListUl;
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
    @Inject(MAT_DIALOG_DATA) public data: PlaylistModalData
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
}
