import { Id3Tag } from './id3-tag.model';
import { SpotifyService } from './../spotify.service';
import { SpotifyTrack } from './../local-tags/spotify-track.model';
import { Component } from '@angular/core';

import { Id3TagParserService } from '../id3-tag-parser.service';
import * as createDebug from 'debug';
import Utils from './../util/Utils';

const debug = createDebug('audio-tag-analyzer:local-tags-component');

@Component({
  selector: 'app-local-tags',
  templateUrl: './local-tags.component.html',
  styleUrls: ['./local-tags.component.css'],
})
export class LocalTagsComponent {
  public exactMatches: SpotifyTrack[] = [];
  public multipleResults: SpotifyTrack[] = [];
  public noResults: Id3Tag[] = [];

  constructor(
    private id3TagParserService: Id3TagParserService,
    private spotifyService: SpotifyService
  ) {}

  public async handleFilesDropped(files: File[]) {
    debug('handleFilesDropped', files);
    for (const file of files) {
      debug('Start parsing file %s', file.name);
      const tag = await this.id3TagParserService.parseFile(file);
      this.spotifyService.getTrackFromSpotify(tag).subscribe((tracks) => {
        this.distributeResults(tag, tracks);
      });
    }
  }

  public async handleTextDropped(text) {
    if (text.indexOf('http') === 0) {
      const tag = await this.id3TagParserService.parseUsingHttp(text);
      this.spotifyService.getTrackFromSpotify(tag).subscribe((tracks) => {
        this.distributeResults(tag, tracks);
      });
    } else {
    }
  }

  private distributeResults(tag: Id3Tag, tracks: SpotifyTrack[]) {
    if (tracks.length === 1) {
      this.addIfNotPresent(this.exactMatches, tracks[0]);
    } else if (tracks.length > 1) {
      tracks.forEach((track) =>
        this.addIfNotPresent(this.multipleResults, track)
      );
    } else {
      this.addIfNotPresent(this.noResults, tag);
    }
  }

  private addIfNotPresent(array: any[], object: any) {
    if (Utils.findIndexOf(array, object) === -1) {
      array.push(object);
    }
  }
}
