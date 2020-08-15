import { Component, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-remove-icon',
  template: `
    <fa-icon
      title="Remove from list"
      class="icon"
      [icon]="faTimes"
      (click)="removeFromList(array, index)"
    ></fa-icon>
  `,
  styleUrls: [
    './remove-icon.component.css',
    './../../local-tags.component.css',
  ],
})
export class RemoveIconComponent {
  @Input() array: [any];
  @Input() index: number;
  faTimes = faTimes;

  constructor() {}

  public removeFromList(array: [any], index: number) {
    array.splice(index, 1);
  }
}
