package com.example.externalspotify.controller;

import com.example.externalspotify.entity.Id3Tag;
import com.example.externalspotify.entity.SpotifyTrack;
import com.example.externalspotify.service.SpotifyApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SpotifyController {
    @Autowired
    private SpotifyApiService spotifyApiService;

    @PostMapping("/track")
    public ResponseEntity<List<SpotifyTrack>> getFromSpotify(@RequestBody Id3Tag id3Tag) {
        List<SpotifyTrack> tracks = spotifyApiService.searchForTrack(id3Tag);
        return ResponseEntity.ok(tracks);
    }
}
