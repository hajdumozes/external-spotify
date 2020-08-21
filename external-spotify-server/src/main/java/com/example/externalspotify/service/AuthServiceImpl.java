package com.example.externalspotify.service;

import com.example.externalspotify.config.UserCredentials;
import com.example.externalspotify.spotifyapi.SpotifyApiFactory;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeRefreshRequest;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.ExecutionException;

@Service
public class AuthServiceImpl implements AuthService {

    @Override
    public String generateAuthorizationCodeUri() {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        try {
            CompletableFuture<URI> uri = spotifyApi
                    .authorizationCodeUri()
                    .scope("user-library-modify user-follow-modify user-library-read user-follow-read")
                    .build()
                    .executeAsync();
            return uri.get().toString();
        } catch (CompletionException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e.getCause().getMessage());
        } catch (CancellationException e) {
            return null;
        }
    }

    @Override
    public UserCredentials initializeTokens(String code) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code).build();
        try {
            CompletableFuture<AuthorizationCodeCredentials> authorizationCodeCredentialsFuture = authorizationCodeRequest.executeAsync();

            AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeCredentialsFuture.get();
            return buildAuthModelFrom(authorizationCodeCredentials);

        } catch (CompletionException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e.getCause().getMessage());
        } catch (CancellationException e) {
            return null;
        }
    }

    @Override
    public UserCredentials refreshTokens(String refreshToken) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        spotifyApi.setRefreshToken(refreshToken);
        AuthorizationCodeRefreshRequest authorizationCodeRefreshRequest = spotifyApi.authorizationCodeRefresh()
                .build();
        try {
            CompletableFuture<AuthorizationCodeCredentials> authorizationCodeCredentialsFuture = authorizationCodeRefreshRequest.executeAsync();
            AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeCredentialsFuture.get();
            UserCredentials userCredentials = buildAuthModelFrom(authorizationCodeCredentials);
            userCredentials.setRefreshToken(refreshToken);
            return userCredentials;

        } catch (CompletionException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e.getCause().getMessage());
        } catch (CancellationException e) {
            return null;
        }
    }

    private UserCredentials buildAuthModelFrom(AuthorizationCodeCredentials codeCredentials) {
        UserCredentials userCredentials = new UserCredentials();
        userCredentials.setAccessToken(codeCredentials.getAccessToken());
        userCredentials.setRefreshToken(codeCredentials.getRefreshToken());
        userCredentials.setExpiresIn(codeCredentials.getExpiresIn());
        return userCredentials;
    }
}
