import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() public clearSelectedTagsEvent = new EventEmitter<void>();

  constructor() {}

  public removeMultipleFromList(array: any[], items: any[]) {
    if (!Array.isArray(items)) {
      items = [items];
    }
    let i = items.length;
    while (i--) {
      this.removeFromList(array, items[i]);
    }
    this.clearSelectedTagsEvent.emit();
  }

  public removeFromList(array: any[], item: any) {
    const index = Utils.findIndexOf(array, item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}
