package com.example.externalspotify.service;

import com.example.externalspotify.entity.Id3Tag;
import com.example.externalspotify.entity.SpotifyTrack;
import com.example.externalspotify.entity.search.TrackSearchContent;

import java.util.List;

public interface SpotifyApiService {
    List<SpotifyTrack> searchForTrack(Id3Tag tag, TrackSearchContent content, String accessToken);
    void likeTrack(String ids, String token);
    void saveAlbum(String ids, String token);
    void followArtists(String ids, String token);
}
