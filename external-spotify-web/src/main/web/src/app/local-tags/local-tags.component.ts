import { Component, OnInit } from '@angular/core';

import { Id3TagParserService } from '../id3-tag-parser.service';
import * as createDebug from 'debug';
import { IAudioMetadata } from 'music-metadata-browser';

const debug = createDebug('audio-tag-analyzer:local-tags-component');

@Component({
  selector: 'app-local-tags',
  templateUrl: './local-tags.component.html',
  styleUrls: ['./local-tags.component.css'],
})
export class LocalTagsComponent implements OnInit {
  public results: IAudioMetadata[];

  constructor(private id3TagParserService: Id3TagParserService) {}

  ngOnInit(): void {}

  public async handleFilesDropped(files: File[]) {
    this.results = []; // initialize results
    debug('handleFilesDropped', files);
    for (const file of files) {
      debug('Start parsing file %s', file.name);
      const metadata = <IAudioMetadata>(
        await this.id3TagParserService.parseFile(file)
      );
      this.results.push(metadata);
    }
  }

  public async handleTextDropped(text) {
    this.results = []; // initialize results
    if (text.indexOf('http') === 0) {
      const metadata = <IAudioMetadata>(
        await this.id3TagParserService.parseUsingHttp(text)
      );
      this.results.push(metadata);
    } else {
    }
  }
}
