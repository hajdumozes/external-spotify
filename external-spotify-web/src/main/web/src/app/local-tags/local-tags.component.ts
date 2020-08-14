import { Id3Tag } from './id3-tag.model';
import { SpotifyService } from './../spotify.service';
import { SpotifyTrack } from './../local-tags/spotify-track.model';
import { Component, OnInit } from '@angular/core';

import { Id3TagParserService } from '../id3-tag-parser.service';
import * as createDebug from 'debug';
import { faHeart, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import Utils from './../util/Utils';

const debug = createDebug('audio-tag-analyzer:local-tags-component');

@Component({
  selector: 'app-local-tags',
  templateUrl: './local-tags.component.html',
  styleUrls: ['./local-tags.component.css'],
})
export class LocalTagsComponent implements OnInit {
  public exactMatches: SpotifyTrack[] = [];
  public multipleResults: SpotifyTrack[] = [];
  public noResults: Id3Tag[] = [];
  public faHeart = faHeart;
  public faVinyl = faRecordVinyl;

  constructor(
    private id3TagParserService: Id3TagParserService,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {}

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
      this.exactMatches.push(tracks[0]);
    } else if (tracks.length > 1) {
      tracks.forEach((track) => this.multipleResults.push(track));
    } else {
      this.noResults.push(tag);
    }
  }

  public likeTrack(track: SpotifyTrack) {
    this.spotifyService.likeTracks(track.trackId).subscribe();
  }

  public likeTracks(tracks: SpotifyTrack[]) {
    const ids: string[] = tracks.map((track) => track.trackId);
    const idChunks: string[][] = Utils.chunkArray(ids, 50);
    idChunks.forEach((idChunk) =>
      this.spotifyService.likeTracks(idChunk.join(',')).subscribe()
    );
  }

  public saveAlbum(track: SpotifyTrack) {
    this.spotifyService.saveAlbum(track.albumId).subscribe();
  }
}
