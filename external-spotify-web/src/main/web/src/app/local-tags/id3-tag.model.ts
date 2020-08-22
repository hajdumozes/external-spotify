import { UniqueObject } from './models/unique-object';

export class Id3Tag implements UniqueObject {
  constructor(
    public album: string,
    public albumArtist: string,
    public artist: string,
    public artists: string[],
    public year: number,
    public title: string
  ) {}

  getId() {
    return JSON.stringify(this);
  }
}
