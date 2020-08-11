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

  public parseUsingHttp(url: string): Promise<mm.IAudioMetadata> {
    debug('Converting HTTP to stream using: ' + url);

    const file: IUrlAsFile = {
      name: url,
      type: '?',
    };

    return mm
      .fetchFromUrl(url)
      .then((metadata) => {
        this.zone.run(() => {
          debug('Completed parsing of %s:', file.name, metadata);
          return metadata;
        });
      })
      .catch((err) => {
        this.zone.run<void>(() => {
          debug('Error: ' + err.message);
        });
      }) as any;
  }

  public parseFile(file: File): Promise<mm.IAudioMetadata> {
    const t0 = new Date().getTime();
    debug('Parsing %s of type %s', file.name, file.type);

    return mm
      .parseBlob(file)
      .then((metadata) => {
        const t1 = new Date().getTime();
        const duration = t1 - t0;
        debug(`Parsing took ${duration} ms`);
        this.zone.run(() => {
          debug('Completed parsing of %s:', file.name, metadata);
        });
        return metadata;
      })
      .catch((err) => {
        this.zone.run<void>(() => {
          debug('Error: ' + err.message);
        });
      }) as any;
  }
}
