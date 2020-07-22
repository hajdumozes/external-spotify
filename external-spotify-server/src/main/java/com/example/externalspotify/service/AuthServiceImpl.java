package com.example.externalspotify.service;

import com.example.externalspotify.global.SpotifyApiSingleton;
import com.wrapper.spotify.SpotifyApi;
import org.springframework.stereotype.Service;

import java.net.URI;

@Service
public class AuthServiceImpl implements AuthService {
    private SpotifyApi spotifyApi = SpotifyApiSingleton.getInstance().getSpotifyApi();

    @Override
    public String generateAuthorizationCodeUri() {
        URI uri = spotifyApi.authorizationCodeUri().build().execute();
        return uri.toString();
    }
}
