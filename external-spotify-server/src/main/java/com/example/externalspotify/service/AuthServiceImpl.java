package com.example.externalspotify.service;

import com.example.externalspotify.config.AuthModel;
import com.example.externalspotify.spotifyapi.SpotifyApiFactory;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
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
                    .scope("user-library-modify user-follow-modify")
                    .build()
                    .executeAsync();
            return uri.get().toString();
        } catch (CompletionException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e.getCause().getMessage());
        } catch (CancellationException e) {
            return null;
        }
    }

    public AuthModel initializeTokens(String code) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code).build();
        try {
            CompletableFuture<AuthorizationCodeCredentials> authorizationCodeCredentialsFuture = authorizationCodeRequest.executeAsync();

            AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeCredentialsFuture.get();

            AuthModel authModel = new AuthModel();
            authModel.setAccessToken(authorizationCodeCredentials.getAccessToken());
            authModel.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
            authModel.setExpiresIn(authorizationCodeCredentials.getExpiresIn());
            return authModel;
        } catch (CompletionException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e.getCause().getMessage());
        } catch (CancellationException e) {
            return null;
        }
    }
}
