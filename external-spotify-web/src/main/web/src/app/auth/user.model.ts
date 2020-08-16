export class User {
  constructor(
    private _accessToken: string,
    private _refreshToken: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._accessToken;
  }

  get refreshToken() {
    return this._refreshToken;
  }
}
