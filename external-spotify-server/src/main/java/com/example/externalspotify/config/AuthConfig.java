package com.example.externalspotify.config;

import com.wrapper.spotify.SpotifyHttpManager;
import lombok.Getter;

import java.net.URI;

public class AuthConfig {
    @Getter
    private static final String clientId = "18da243cebd844dab63e408afaa927ba";
    @Getter
    private static final String clientSecret = "0bdd3a319c794da1a4363a1c0c8db6b6";
    @Getter
    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:8080/spotify-uri-callback");
}
