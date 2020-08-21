package com.example.externalspotify.service;

import com.example.externalspotify.entity.SpotifyPlaylist;

import java.util.List;

public interface SpotifyPlaylistService {
    List<SpotifyPlaylist> getUserPlaylists(String token);
}
