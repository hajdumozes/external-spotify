import { SpotifyTrack } from './local-tags/spotify-track.model';
import { SpotifyService } from './spotify.service';
import { Injectable, NgZone } from '@angular/core';

import * as mm from 'music-metadata-browser';
import * as createDebug from 'debug';

interface IUrlAsFile {
  name: string;
  type: string;
}

export interface Id3Tag {
  album: string;
  albumArtist: string;
  artist: string;
  artists: string[];
  year: number;
  title: string;
}

const debug = createDebug('audio-tag-analyzer:id3-tag-parser-service');

@Injectable({
  providedIn: 'root',
})
export class Id3TagParserService {
  constructor(private zone: NgZone, private spotifyService: SpotifyService) {}

  public async parseUsingHttp(url: string): Promise<SpotifyTrack[]> {
    try {
      debug('Converting HTTP to stream using: ' + url);

      const file: IUrlAsFile = {
        name: url,
        type: '?',
      };
      const metadata: mm.IAudioMetadata = await mm.fetchFromUrl(url);
      const tag = this.mapMetadataToTag(metadata);
      this.zone.run(() => {
        debug('Completed parsing of %s:', file.name, metadata);
      });
      return this.spotifyService.getTrackFromSpotify(tag).toPromise();
    } catch (err) {
      this.zone.run<void>(() => {
        debug('Error: ' + err.message);
      });
    }
  }

  public async parseFile(file: File): Promise<SpotifyTrack[]> {
    try {
      const t0 = new Date().getTime();
      debug('Parsing %s of type %s', file.name, file.type);

      const metadata: mm.IAudioMetadata = await mm.parseBlob(file);
      const tag = this.mapMetadataToTag(metadata);
      const t1 = new Date().getTime();
      const duration = t1 - t0;
      debug(`Parsing took ${duration} ms`);
      this.zone.run(() => {
        debug('Completed parsing of %s:', file.name, metadata);
      });
      return this.spotifyService.getTrackFromSpotify(tag).toPromise();
    } catch (err) {
      this.zone.run<void>(() => {
        debug('Error: ' + err.message);
      });
    }
  }

  private mapMetadataToTag(metadata: mm.IAudioMetadata): Id3Tag {
    return {
      album: metadata.common.album,
      albumArtist: metadata.common.albumartist,
      artist: metadata.common.artist,
      artists: metadata.common.artists,
      year: metadata.common.year,
      title: metadata.common.title,
    };
  }
}
