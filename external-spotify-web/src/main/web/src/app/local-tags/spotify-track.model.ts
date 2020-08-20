import { SpotifyArtist } from './spotify-artist.model';
export class SpotifyTrack {
  constructor(
    public album: string,
    public albumId: string,
    public title: string,
    public trackId: string,
    public year: number,
    public artists: SpotifyArtist[],
    public url: string,
    public liked: boolean = false,
    public albumSaved: boolean = false
  ) {}
  get artistNames() {
    return this.artists.map((artist) => artist.name);
  }

  get artistsFollowed() {
    return this.artists.every((artist) => artist.followed);
  }
}
