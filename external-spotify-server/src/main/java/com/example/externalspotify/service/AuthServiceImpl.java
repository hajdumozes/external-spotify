package com.example.externalspotify.service;

import com.example.externalspotify.global.SpotifyApiSingleton;
import com.wrapper.spotify.SpotifyApi;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.ExecutionException;

@Service
public class AuthServiceImpl implements AuthService {
    private SpotifyApi spotifyApi = SpotifyApiSingleton.getInstance().getSpotifyApi();

    @Override
    public String generateAuthorizationCodeUri() {
        try {
            CompletableFuture<URI> uri = spotifyApi.authorizationCodeUri().build().executeAsync();
            return uri.get().toString();
        } catch (CompletionException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e.getCause().getMessage());
        } catch (CancellationException e) {
            return null;
        }
    }
}
