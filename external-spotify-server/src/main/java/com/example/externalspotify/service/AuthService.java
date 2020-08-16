package com.example.externalspotify.service;


import com.example.externalspotify.config.AuthModel;

public interface AuthService {
    String generateAuthorizationCodeUri();
    AuthModel initializeTokens(String code);
    AuthModel refreshTokens(String refreshToken);
}
