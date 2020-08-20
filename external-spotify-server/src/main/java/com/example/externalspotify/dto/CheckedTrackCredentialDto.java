package com.example.externalspotify.dto;

import com.example.externalspotify.config.UserCredentials;
import lombok.Data;

@Data
public class CheckedTrackCredentialDto {
    private Boolean[] liked;
    private UserCredentials userCredentials;
}
