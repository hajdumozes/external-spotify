import { SpotifyTrack } from './../../spotify-track.model';
import { Component, Input } from '@angular/core';
import Utils from './../../../util/Utils';

@Component({
  selector: 'app-exact-matches-table',
  template: `
    <h2 *ngIf="tracks.length > 0">Exact matches</h2>
    <table *ngIf="tracks.length > 0" class="table table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Album</th>
          <th>Artists</th>
          <th>Url</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>All Tracks</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <app-like-icon [tracks]="tracks"></app-like-icon>
            <app-album-icon [tracks]="tracks"></app-album-icon>
            <app-follow-artist-icon [tracks]="tracks"></app-follow-artist-icon>
            <app-remove-icon
              [array]="tracks"
              [items]="tracks"
            ></app-remove-icon>
          </td>
        </tr>
        <tr *ngIf="selectedTracks.length > 0">
          <td>All Selected Tracks</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <app-like-icon [tracks]="selectedTracks"></app-like-icon>
            <app-album-icon [tracks]="selectedTracks"></app-album-icon>
            <app-follow-artist-icon
              [tracks]="selectedTracks"
            ></app-follow-artist-icon>
            <app-remove-icon
              [array]="tracks"
              [items]="selectedTracks"
              (clearSelectedTagsEvent)="clearSelectedTags()"
            ></app-remove-icon>
          </td>
        </tr>
        <tr
          class="clickable-row"
          *ngFor="let track of tracks; let i = index"
          (click)="selectRow(track)"
          [ngClass]="{ 'table-active': isActive(track) }"
        >
          <td>{{ track.title }}</td>
          <td>{{ track.album }}</td>
          <td>{{ track.artistNames.join(', ') }}</td>
          <td><a href="{{ track.url }}" target="_blank">Link</a></td>
          <td>
            <app-like-icon [tracks]="[tracks[i]]"></app-like-icon>
            <app-album-icon [tracks]="[tracks[i]]"></app-album-icon>
            <app-follow-artist-icon
              [tracks]="[tracks[i]]"
            ></app-follow-artist-icon>
            <app-remove-icon
              [array]="tracks"
              [items]="[tracks[i]]"
            ></app-remove-icon>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: [
    './exact-matches-table.component.css',
    './../../local-tags.component.css',
  ],
})
export class ExactMatchesTableComponent {
  @Input() tracks: SpotifyTrack[];
  selectedTracks: SpotifyTrack[] = [];

  constructor() {}

  isActive(track: SpotifyTrack) {
    let active = Utils.findIndexOf(this.selectedTracks, track) > -1;
    return active;
  }

  selectRow(track: SpotifyTrack) {
    const indexOf = Utils.findIndexOf(this.selectedTracks, track);
    if (indexOf > -1) {
      this.selectedTracks.splice(indexOf, 1);
    } else {
      this.selectedTracks.push(track);
    }
  }
  clearSelectedTags() {
    this.selectedTracks = [];
  }
}
