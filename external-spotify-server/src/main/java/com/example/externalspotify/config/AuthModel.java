package com.example.externalspotify.config;

import lombok.Data;

@Data
public class AuthModel {
    private String accessToken;
    private String refreshToken;
    private Integer expiresIn;
}
