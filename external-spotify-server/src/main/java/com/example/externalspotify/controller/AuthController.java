package com.example.externalspotify.controller;

import com.example.externalspotify.config.UserCredentials;
import com.example.externalspotify.service.AuthService;
import com.example.externalspotify.service.SpotifyApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {
    @Autowired
    private SpotifyApiService spotifyApiService;
    @Autowired
    private AuthService authService;

    @GetMapping("/spotify-uri")
    public ResponseEntity<String> getAuthUri() {
        String uri = authService.generateAuthorizationCodeUri();
        return ResponseEntity.ok(uri);
    }

    @PostMapping("/initialize-tokens")
    public ResponseEntity<UserCredentials> initializeTokens(@RequestBody String code) {
        UserCredentials userCredentials = authService.initializeTokens(code);
        return ResponseEntity.ok(userCredentials);
    }
}