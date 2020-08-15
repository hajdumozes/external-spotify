import { Id3Tag } from './../../id3-tag.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-results-table',
  template: `
    <h2 *ngIf="tracks.length > 0">No results</h2>
    <table *ngIf="tracks.length > 0" class="table">
      <tr>
        <td>Title</td>
        <td>Album</td>
        <td>Artist</td>
        <td>Year</td>
      </tr>
      <tr *ngFor="let tag of tracks; let i = index">
        <td>{{ tag.title }}</td>
        <td>{{ tag.album }}</td>
        <td>{{ tag.artist }}</td>
        <td>{{ tag.year }}</td>
        <td>
          <app-remove-icon [array]="tracks" [index]="i"></app-remove-icon>
        </td>
      </tr>
    </table>
  `,
  styleUrls: ['./no-results-table.component.css'],
})
export class NoResultsTableComponent {
  @Input() tracks: Id3Tag[];

  constructor() {}
}
