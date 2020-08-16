package com.example.externalspotify.dto;

import com.example.externalspotify.config.UserCredentials;
import com.example.externalspotify.entity.SpotifyTrack;
import lombok.Data;

import java.util.List;

@Data
public class SpotifyTracksCredentialDto {
    private List<SpotifyTrack> tracks;
    private UserCredentials userCredentials;
}
