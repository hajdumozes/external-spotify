import { SpotifyTrack } from './../../spotify-track.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exact-matches-table',
  template: `
    <h2 *ngIf="tracks.length > 0">Exact matches</h2>
    <table *ngIf="tracks.length > 0" class="table">
      <tr>
        <td>Title</td>
        <td>Album</td>
        <td>Artists</td>
        <td>Url</td>
        <td>Actions</td>
      </tr>
      <tr *ngFor="let track of tracks; let i = index">
        <td>{{ track.title }}</td>
        <td>{{ track.album }}</td>
        <td>{{ track.artistNames.join(', ') }}</td>
        <td><a href="{{ track.url }}" target="_blank">Link</a></td>
        <td>
          <app-like-icon [track]="tracks[i]"></app-like-icon>
          <app-album-icon [track]="tracks[i]"></app-album-icon>
          <app-follow-artist-icon [track]="tracks[i]"></app-follow-artist-icon>
          <app-remove-icon [array]="tracks" [index]="i"></app-remove-icon>
        </td>
      </tr>
    </table>
  `,
  styleUrls: ['./exact-matches-table.component.css'],
})
export class ExactMatchesTableComponent {
  @Input() tracks: SpotifyTrack[];

  constructor() {}
}
