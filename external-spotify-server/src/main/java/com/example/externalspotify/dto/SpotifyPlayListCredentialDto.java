package com.example.externalspotify.dto;

import com.example.externalspotify.config.UserCredentials;
import com.example.externalspotify.entity.SpotifyPlaylist;
import lombok.Data;

import java.util.List;

@Data
public class SpotifyPlayListCredentialDto {
    private List<SpotifyPlaylist> playlists;
    private UserCredentials userCredentials;
}
