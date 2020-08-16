package com.example.externalspotify.spotifyapi;

import com.example.externalspotify.config.AuthConfig;
import com.wrapper.spotify.SpotifyApi;

public class SpotifyApiFactory {
    public static SpotifyApi createDefault() {
        return new SpotifyApi.Builder()
                .setClientId(AuthConfig.getClientId())
                .setClientSecret(AuthConfig.getClientSecret())
                .setRedirectUri(AuthConfig.getRedirectUri())
                .build();
    }
}
