export class SpotifyArtist {
  constructor(
    public name: string,
    public id: string,
    public followed: boolean = false
  ) {}
}
