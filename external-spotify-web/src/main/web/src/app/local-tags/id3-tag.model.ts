export class Id3Tag {
  constructor(
    public album: string,
    public albumArtist: string,
    public artist: string,
    public artists: string[],
    public year: number,
    public title: string
  ) {}
}
