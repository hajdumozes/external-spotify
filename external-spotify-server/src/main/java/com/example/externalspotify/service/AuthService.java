package com.example.externalspotify.service;


import com.example.externalspotify.config.UserCredentials;

public interface AuthService {
    String generateAuthorizationCodeUri();
    UserCredentials initializeTokens(String code);
    UserCredentials refreshTokens(String refreshToken);
}
