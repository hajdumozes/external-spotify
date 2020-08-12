import { SpotifyService } from './../spotify.service';
import { SpotifyTrack } from './../local-tags/spotify-track.model';
import { Component, OnInit } from '@angular/core';

import { Id3TagParserService } from '../id3-tag-parser.service';
import * as createDebug from 'debug';

const debug = createDebug('audio-tag-analyzer:local-tags-component');

@Component({
  selector: 'app-local-tags',
  templateUrl: './local-tags.component.html',
  styleUrls: ['./local-tags.component.css'],
})
export class LocalTagsComponent implements OnInit {
  public exactMatches: SpotifyTrack[];

  constructor(
    private id3TagParserService: Id3TagParserService,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {}

  public async handleFilesDropped(files: File[]) {
    this.exactMatches = []; // initialize results
    debug('handleFilesDropped', files);
    for (const file of files) {
      debug('Start parsing file %s', file.name);
      const tag = await this.id3TagParserService.parseFile(file);
      this.spotifyService.getTrackFromSpotify(tag).subscribe((tracks) => {
        tracks.forEach((track) => this.exactMatches.push(track));
      });
    }
  }

  public async handleTextDropped(text) {
    this.exactMatches = []; // initialize results
    if (text.indexOf('http') === 0) {
      const tag = await this.id3TagParserService.parseUsingHttp(text);
      this.spotifyService.getTrackFromSpotify(tag).subscribe((tracks) => {
        tracks.forEach((track) => this.exactMatches.push(track));
      });
    } else {
    }
  }
}
