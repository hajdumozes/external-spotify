package com.example.externalspotify.service;

import com.example.externalspotify.entity.Id3Tag;
import com.example.externalspotify.entity.SpotifyTrack;

import java.util.List;

public interface SpotifyApiService {
    List<SpotifyTrack> searchForTrack(Id3Tag tag);
}
