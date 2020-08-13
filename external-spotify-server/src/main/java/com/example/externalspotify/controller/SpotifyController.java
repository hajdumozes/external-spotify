package com.example.externalspotify.controller;

import com.example.externalspotify.entity.Id3Tag;
import com.example.externalspotify.entity.SpotifyTrack;
import com.example.externalspotify.exception.SpotifyException;
import com.example.externalspotify.service.SpotifyApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/like-track")
    public ResponseEntity<String> likeSong(@RequestParam String id) {
        spotifyApiService.likeTrack(id);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler({SpotifyException.class})
    public ResponseEntity error(SpotifyException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
