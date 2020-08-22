import { TrackService } from './../../services/track.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import Utils from './../../../util/Utils';

@Component({
  selector: 'app-remove-icon',
  template: `
    <span>
      <button
        mat-icon-button
        (click)="removeMultipleFromList(array, items)"
        matTooltip="Remove from list"
      >
        <mat-icon>clear</mat-icon>
      </button>
    </span>
  `,
  styleUrls: [
    './remove-icon.component.css',
    './../../local-tags.component.css',
  ],
})
export class RemoveIconComponent {
  @Input() array: any[];
  @Input() items: any[];
  @Input() trackService: TrackService;
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
    this.trackService.updateStorage(array);
  }
}
