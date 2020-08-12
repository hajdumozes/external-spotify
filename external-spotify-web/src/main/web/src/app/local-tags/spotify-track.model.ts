export class SpotifyTrack {
  constructor(
    public album: string,
    public albumId: string,
    public title: string,
    public trackId: string,
    public year: number,
    public artists: string[],
    public url: string
  ) {}
}
