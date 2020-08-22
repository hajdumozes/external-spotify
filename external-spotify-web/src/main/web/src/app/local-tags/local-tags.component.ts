import { MultipleResultsService } from './services/multiple-results.service';
import { NoResultsService } from './services/no-results.service';
import { ExactMatchesService } from './services/exact-matches.service';
import { SpotifyTrack } from './models/spotify-track.model';
import { SpotifyPlaylist } from './models/spotify-playlist.model';
import { SpotifyArtist } from './models/spotify-artist.model';
import { Id3Tag } from './id3-tag.model';
import { SpotifyService } from './../spotify.service';
import { Component, OnInit } from '@angular/core';

import { Id3TagParserService } from '../id3-tag-parser.service';
import * as createDebug from 'debug';
import Utils from './../util/Utils';

const debug = createDebug('audio-tag-analyzer:local-tags-component');

@Component({
  selector: 'app-local-tags',
  templateUrl: './local-tags.component.html',
  styleUrls: ['./local-tags.component.css'],
})
export class LocalTagsComponent implements OnInit {
  public exactMatches: SpotifyTrack[];
  public multipleResults: SpotifyTrack[];
  public noResults: Id3Tag[];
  public loading: boolean = false;
  public currentFileName: string = '';
  public progressPercentage: number;
  public playlists: SpotifyPlaylist[] = [];

  constructor(
    private id3TagParserService: Id3TagParserService,
    private spotifyService: SpotifyService,
    public exactMatchesService: ExactMatchesService,
    public multipleResultsService: MultipleResultsService,
    public noResultsService: NoResultsService
  ) {}

  ngOnInit() {
    this.exactMatchesService.exactMatches.subscribe((data) => {
      this.exactMatches = data;
    });
    this.multipleResultsService.multipleResult.subscribe((data) => {
      this.multipleResults = data;
    });
    this.noResultsService.noResult.subscribe((data) => {
      this.noResults = data;
    });
  }

  public async handleFilesDropped(files: File[]) {
    debug('handleFilesDropped', files);
    this.loading = true;
    this.progressPercentage = 0;
    const chunkPercentage = 100 / files.length;
    for (const file of files) {
      this.progressPercentage += chunkPercentage;
      this.currentFileName = file.name;
      debug('Start parsing file %s', file.name);
      const tag = await this.id3TagParserService.parseFile(file);
      const tracks: SpotifyTrack[] = await this.spotifyService
        .getTrackFromSpotify(tag)
        .toPromise();
      await this.distributeResults(tag, tracks);
    }
    this.checkStatuses();
    this.getUserPlaylists();
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
      this.exactMatchesService.updateStorage(this.exactMatches);
    } else if (tracks.length > 1) {
      tracks.forEach((track) =>
        this.addIfNotPresent(this.multipleResults, track)
      );
      this.multipleResultsService.updateStorage(this.multipleResults);
    } else {
      this.addIfNotPresent(this.noResults, tag);
      this.noResultsService.updateStorage(this.noResults);
    }
  }

  private addIfNotPresent(array: any[], object: any) {
    if (Utils.findIndexOf(array, object) === -1) {
      array.push(object);
    }
  }

  private async checkLikedTracks() {
    debug('Start checking liked tracks');
    const spotifyTracks: SpotifyTrack[] = this.exactMatches.concat(
      this.multipleResults
    );
    const ids = spotifyTracks.map((track) => track.trackId);
    const idChunks: string[][] = Utils.chunkArray(ids, 50);
    let i = 0;
    for await (const idChunk of idChunks) {
      const areTracksLiked = await this.spotifyService
        .checkLikedTracks(idChunk.join(','))
        .toPromise();
      areTracksLiked.map((isTrackLiked) => {
        spotifyTracks[i].liked = isTrackLiked;
        i++;
      });
    }
  }

  private async checkSavedAlbums() {
    debug('Start checking saved albums');
    const spotifyTracks: SpotifyTrack[] = this.exactMatches.concat(
      this.multipleResults
    );
    const ids = spotifyTracks.map((track) => track.albumId);
    const idChunks: string[][] = Utils.chunkArray(ids, 50);
    let i = 0;
    for await (const idChunk of idChunks) {
      const areAlbumsSaved = await this.spotifyService
        .checkSavedAlbums(idChunk.join(','))
        .toPromise();
      areAlbumsSaved.map((isAlbumSaved) => {
        spotifyTracks[i].albumSaved = isAlbumSaved;
        i++;
      });
    }
  }

  private async checkFollowedArtists() {
    debug('Start checking followed artists');
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
    for await (const idChunk of idChunks) {
      const areArtistsFollowed = await this.spotifyService
        .checkFollowedArtists(idChunk.join(','))
        .toPromise();
      areArtistsFollowed.map((isArtistFollowed) => {
        mergedArtists[i].followed = isArtistFollowed;
        i++;
      });
    }
  }

  private getUserPlaylists() {
    debug('Start getting user playlists');
    this.spotifyService.getUserPlaylists().subscribe((playlists) => {
      debug('Setting playlists', playlists);
      this.playlists = playlists;
    });
  }

  private async checkStatuses() {
    await this.checkLikedTracks();
    await this.checkSavedAlbums();
    // todo artists shouldn't contain duplicate ids
    //await this.checkFollowedArtists();
    this.saveState();
  }

  public clearData() {
    this.exactMatches = [];
    this.multipleResults = [];
    this.noResults = [];
    this.saveState();
  }

  private saveState() {
    this.exactMatchesService.updateStorage(this.exactMatches);
    this.multipleResultsService.updateStorage(this.multipleResults);
    this.noResultsService.updateStorage(this.noResults);
  }
}
