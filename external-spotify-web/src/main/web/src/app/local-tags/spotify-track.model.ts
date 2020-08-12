import { SpotifyArtist } from './spotify-artist.model';
export class SpotifyTrack {
  constructor(
    public album: string,
    public albumId: string,
    public title: string,
    public trackId: string,
    public year: number,
    public artists: SpotifyArtist[],
    public url: string
  ) {}
  get artistNames() {
    return this.artists.map((artist) => artist.name);
  }
}