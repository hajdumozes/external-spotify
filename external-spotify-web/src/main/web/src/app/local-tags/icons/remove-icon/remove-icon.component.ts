import { Component, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Utils from './../../../util/Utils';

@Component({
  selector: 'app-remove-icon',
  template: `
    <fa-icon
      title="Remove from list"
      class="icon"
      [icon]="faTimes"
      (click)="removeMultipleFromList(array, items)"
    ></fa-icon>
  `,
  styleUrls: [
    './remove-icon.component.css',
    './../../local-tags.component.css',
  ],
})
export class RemoveIconComponent {
  @Input() array: any[];
  @Input() items: any[];
  faTimes = faTimes;

  constructor() {}

  public removeMultipleFromList(array: any[], items: any[]) {
    if (!Array.isArray(items)) {
      items = [items];
    }
    items.forEach((item) => this.removeFromList(array, item));
  }

  public removeFromList(array: any[], item: any) {
    const index = Utils.findIndexOf(array, item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}
