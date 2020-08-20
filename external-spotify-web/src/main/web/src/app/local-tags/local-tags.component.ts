import { SpotifyArtist } from './spotify-artist.model';
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
  public loading: boolean = false;

  constructor(
    private id3TagParserService: Id3TagParserService,
    private spotifyService: SpotifyService
  ) {}

  public async handleFilesDropped(files: File[]) {
    debug('handleFilesDropped', files);
    this.loading = true;
    for (const file of files) {
      debug('Start parsing file %s', file.name);
      const tag = await this.id3TagParserService.parseFile(file);
      const tracks: SpotifyTrack[] = await this.spotifyService
        .getTrackFromSpotify(tag)
        .toPromise();
      await this.distributeResults(tag, tracks);
    }
    this.checkLikedTracks();
    this.checkSavedAlbums();
    this.checkFollowedArtists();
    this.loading = false;
  }

  public async handleTextDropped(text) {
    debug('handleTextDropped', text);
    if (text.indexOf('http') === 0) {
      const tag = await this.id3TagParserService.parseUsingHttp(text);
      const tracks: SpotifyTrack[] = await this.spotifyService
        .getTrackFromSpotify(tag)
        .toPromise();
      await this.distributeResults(tag, tracks);
      this.checkLikedTracks();
      this.checkSavedAlbums();
      this.checkFollowedArtists();
    } else {
    }
  }

  private distributeResults(tag: Id3Tag, tracks: SpotifyTrack[]) {
    debug('Start distributing results', tracks);
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

  private checkLikedTracks() {
    debug('Start checking liked tracks');
    const spotifyTracks: SpotifyTrack[] = this.exactMatches.concat(
      this.multipleResults
    );
    const ids = spotifyTracks.map((track) => track.trackId);
    const idChunks: string[][] = Utils.chunkArray(ids, 50);
    let i = 0;
    idChunks.forEach((idChunk) =>
      this.spotifyService
        .checkLikedTracks(idChunk.join(','))
        .subscribe((areTracksLiked) =>
          areTracksLiked.map((isTrackLiked) => {
            spotifyTracks[i].liked = isTrackLiked;
            i++;
          })
        )
    );
  }

  private checkSavedAlbums() {
    debug('Start checking saved albums');
    const spotifyTracks: SpotifyTrack[] = this.exactMatches.concat(
      this.multipleResults
    );
    const ids = spotifyTracks.map((track) => track.albumId);
    const idChunks: string[][] = Utils.chunkArray(ids, 50);
    let i = 0;
    idChunks.forEach((idChunk) =>
      this.spotifyService
        .checkSavedAlbums(idChunk.join(','))
        .subscribe((areAlbumsSaved) =>
          areAlbumsSaved.map((isAlbumSaved) => {
            spotifyTracks[i].albumSaved = isAlbumSaved;
            i++;
          })
        )
    );
  }

  private checkFollowedArtists() {
    debug('Start checking saved albums');
    const spotifyTracks: SpotifyTrack[] = this.exactMatches.concat(
      this.multipleResults
    );
    const artists: SpotifyArtist[][] = spotifyTracks.map(
      (track) => track.artists
    );
    const mergedArtists: SpotifyArtist[] = [].concat.apply([], artists);
    const artistIds: string[] = mergedArtists.map((artist) => artist.id);
    const idChunks: string[][] = Utils.chunkArray(artistIds, 50);
    let i = 0;
    idChunks.forEach((idChunk) =>
      this.spotifyService
        .checkSavedAlbums(idChunk.join(','))
        .subscribe((areArtistsFollowed) =>
          areArtistsFollowed.map((isArtistFollowed) => {
            mergedArtists[i].followed = isArtistFollowed;
            i++;
          })
        )
    );
  }
}
