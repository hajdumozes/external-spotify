package com.example.externalspotify.global;

import com.example.externalspotify.config.AuthConfig;
import com.wrapper.spotify.SpotifyApi;
import lombok.Getter;

public class SpotifyApiSingleton {
    private static SpotifyApiSingleton SPOTIFY_API_SINGLETON;
    @Getter
    private SpotifyApi spotifyApi;

    private SpotifyApiSingleton() {
        spotifyApi = new SpotifyApi.Builder()
                .setClientId(AuthConfig.getClientId())
                .setClientSecret(AuthConfig.getClientSecret())
                .setRedirectUri(AuthConfig.getRedirectUri())
                .build();
    }

    public static SpotifyApiSingleton getInstance() {
        if (SPOTIFY_API_SINGLETON == null) {
            SPOTIFY_API_SINGLETON = new SpotifyApiSingleton();
        }
        return SPOTIFY_API_SINGLETON;
    }
}
