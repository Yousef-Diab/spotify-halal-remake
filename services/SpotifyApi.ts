const SpotifyWebApi = require('spotify-web-api-node');


export class spotifyApi {
    private static _instance: any;

    public static instance(accessToken?: string) {
        if (!this._instance) {
            this._instance = new SpotifyWebApi({
                clientId: process.env.SPOTIFY_CLIENT_ID,
                clientSecret: process.env.SPOTIFY_SECRET_ID,
                accessToken: accessToken,
            });
        }
        if(accessToken !== this._instance.accessToken)this._instance.accessToken=accessToken;
        return this._instance;
    }
}