import { SpotifyTrack } from './../../spotify-track.model';
import { Component, Input, Inject } from '@angular/core';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

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

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(PlaylistModal, {
      data: { name: 'temp' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'playlist-modal',
  templateUrl: 'playlist-icon-modal.component.html',
})
export class PlaylistModal {
  constructor(
    public dialogRef: MatDialogRef<PlaylistIconComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
