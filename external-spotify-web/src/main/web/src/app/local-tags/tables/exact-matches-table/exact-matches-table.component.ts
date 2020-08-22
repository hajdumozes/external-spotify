import { TrackService } from './../../services/track.service';
import { SpotifyPlaylist } from './../../models/spotify-playlist.model';
import { SpotifyTrack } from './../../models/spotify-track.model';
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
        <tr class="table-info">
          <td>All Tracks</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <app-like-icon
              [tracks]="tracks"
              [trackService]="trackService"
            ></app-like-icon>
            <app-album-icon
              [tracks]="tracks"
              [trackService]="trackService"
            ></app-album-icon>
            <app-follow-artist-icon
              [tracks]="tracks"
              [trackService]="trackService"
            ></app-follow-artist-icon>
            <app-playlist-icon
              [tracks]="tracks"
              [playlists]="playlists"
            ></app-playlist-icon>
            <app-remove-icon
              [array]="tracks"
              [items]="tracks"
              [trackService]="trackService"
            ></app-remove-icon>
          </td>
        </tr>
        <tr class="table-warning">
          <td>All Selected Tracks</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <app-like-icon
              [tracks]="selectedTracks"
              [trackService]="trackService"
            ></app-like-icon>
            <app-album-icon
              [tracks]="selectedTracks"
              [trackService]="trackService"
            ></app-album-icon>
            <app-follow-artist-icon
              [tracks]="selectedTracks"
              [trackService]="trackService"
            ></app-follow-artist-icon>
            <app-playlist-icon
              [tracks]="selectedTracks"
              [playlists]="playlists"
            ></app-playlist-icon>
            <app-remove-icon
              [array]="tracks"
              [items]="selectedTracks"
              [trackService]="trackService"
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
          <td>
            <div>
              <a href="{{ track.url }}">Open in web app</a>
            </div>
            <div>
              <a href="{{ track.previewUrl }}">Play preview</a>
            </div>
          </td>
          <td>
            <app-like-icon
              [tracks]="[tracks[i]]"
              [trackService]="trackService"
            ></app-like-icon>
            <app-album-icon
              [tracks]="[tracks[i]]"
              [trackService]="trackService"
            ></app-album-icon>
            <app-follow-artist-icon
              [tracks]="[tracks[i]]"
              [trackService]="trackService"
            ></app-follow-artist-icon>
            <app-playlist-icon
              [tracks]="[tracks[i]]"
              [playlists]="playlists"
            ></app-playlist-icon>
            <app-remove-icon
              [array]="tracks"
              [items]="[tracks[i]]"
              [trackService]="trackService"
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
  @Input() trackService: TrackService;
  @Input() playlists: SpotifyPlaylist[];
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
