import { Id3Tag } from './../../id3-tag.model';
import { Component, Input } from '@angular/core';
import Utils from './../../../util/Utils';

@Component({
  selector: 'app-no-results-table',
  template: `
    <h2 *ngIf="tags.length > 0">No results</h2>
    <table *ngIf="tags.length > 0" class="table table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Album</th>
          <th>Artist</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        <tr
          *ngFor="let tag of tags; let i = index"
          class="clickable-row"
          (click)="selectRow(tag)"
          [ngClass]="{ 'table-active': isActive(tag) }"
        >
          <td>{{ tag.title }}</td>
          <td>{{ tag.album }}</td>
          <td>{{ tag.artist }}</td>
          <td>{{ tag.year }}</td>
          <td>
            <app-remove-icon
              [array]="tags"
              [items]="[tags[i]]"
            ></app-remove-icon>
          </td>
        </tr>
        <tr *ngIf="selectedTags.length > 0">
          <td>All Selected Tracks</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <app-remove-icon
              [array]="tags"
              [items]="selectedTags"
            ></app-remove-icon>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./no-results-table.component.css'],
})
export class NoResultsTableComponent {
  @Input() tags: Id3Tag[];
  selectedTags: Id3Tag[] = [];

  constructor() {}

  isActive(tag: Id3Tag) {
    let active = Utils.findIndexOf(this.selectedTags, tag) > -1;
    return active;
  }

  selectRow(tag: Id3Tag) {
    const indexOf = Utils.findIndexOf(this.selectedTags, tag);
    if (indexOf > -1) {
      this.selectedTags.splice(indexOf, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }
}
