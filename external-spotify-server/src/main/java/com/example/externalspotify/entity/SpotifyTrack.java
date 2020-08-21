package com.example.externalspotify.entity;

import lombok.Data;

import java.util.List;

@Data
public class SpotifyTrack {
    private String album;
    private String albumId;
    private String title;
    private String trackId;
    private int year;
    private List<SpotifyArtist> artists;
    private String url;
    private String uri;
}
