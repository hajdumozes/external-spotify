import { Id3Tag } from './local-tags/id3-tag.model';
import { Injectable, NgZone } from '@angular/core';

import * as mm from 'music-metadata-browser';
import * as createDebug from 'debug';

interface IUrlAsFile {
  name: string;
  type: string;
}

const debug = createDebug('audio-tag-analyzer:id3-tag-parser-service');

@Injectable({
  providedIn: 'root',
})
export class Id3TagParserService {
  constructor(private zone: NgZone) {}

  public async parseUsingHttp(url: string): Promise<Id3Tag> {
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
      return tag;
    } catch (err) {
      this.zone.run<void>(() => {
        debug('Error: ' + err.message);
      });
    }
  }

  public async parseFile(file: File): Promise<Id3Tag> {
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
      return tag;
    } catch (err) {
      this.zone.run<void>(() => {
        debug('Error: ' + err.message);
      });
    }
  }

  private mapMetadataToTag(metadata: mm.IAudioMetadata): Id3Tag {
    const common = metadata.common;
    return new Id3Tag(
      common.album,
      common.albumartist,
      common.artist,
      common.artists,
      common.year,
      common.title
    );
  }
}
