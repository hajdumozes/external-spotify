package com.example.externalspotify.config;

import lombok.Data;

@Data
public class UserCredentials {
    private String accessToken;
    private String refreshToken;
    private Integer expiresIn;
}
