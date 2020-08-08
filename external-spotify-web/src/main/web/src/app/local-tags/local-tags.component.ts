import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-tags',
  templateUrl: './local-tags.component.html',
  styleUrls: ['./local-tags.component.css'],
})
export class LocalTagsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  handleFileInput(files: FileList) {
    const fileArray = Array.from(files);
    for (const file of fileArray) {
      console.log(
        'OUTPUT: LocalTagsComponent -> handleFileInput -> file',
        file
      );
    }
  }
}
