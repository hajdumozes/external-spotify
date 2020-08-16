package com.example.externalspotify.controller;

import com.example.externalspotify.config.UserCredentials;
import com.example.externalspotify.dto.SpotifyTracksCredentialDto;
import com.example.externalspotify.entity.Id3Tag;
import com.example.externalspotify.entity.SpotifyTrack;
import com.example.externalspotify.exception.SpotifyException;
import com.example.externalspotify.service.AuthService;
import com.example.externalspotify.service.SpotifyApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SpotifyController {
    @Autowired
    private SpotifyApiService spotifyApiService;
    @Autowired
    private AuthService authService;

    @PostMapping("/track")
    public ResponseEntity<SpotifyTracksCredentialDto> getFromSpotify(@RequestBody Id3Tag id3Tag, @RequestParam String accessToken, @RequestParam String refreshToken) {
        List<SpotifyTrack> tracks = spotifyApiService.searchForTrack(id3Tag, accessToken);
        UserCredentials userCredentials = authService.refreshTokens(refreshToken);
        SpotifyTracksCredentialDto dto = mapSpotifyTracksToDto(tracks, userCredentials);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/like-track")
    public ResponseEntity<UserCredentials> likeSong(@RequestParam String ids, @RequestParam String accessToken, @RequestParam String refreshToken) {
        spotifyApiService.likeTrack(ids, accessToken);
        UserCredentials userCredentials = authService.refreshTokens(refreshToken);
        return ResponseEntity.ok(userCredentials);
    }

    @GetMapping("/save-album")
    public ResponseEntity<UserCredentials> saveAlbum(@RequestParam String ids, @RequestParam String accessToken, @RequestParam String refreshToken) {
        spotifyApiService.saveAlbum(ids, accessToken);
        UserCredentials userCredentials = authService.refreshTokens(refreshToken);
        return ResponseEntity.ok(userCredentials);
    }

    @GetMapping("/follow-artist")
    public ResponseEntity<UserCredentials> followArtist(@RequestParam String ids, @RequestParam String accessToken, @RequestParam String refreshToken) {
        spotifyApiService.followArtists(ids, accessToken);
        UserCredentials userCredentials = authService.refreshTokens(refreshToken);
        return ResponseEntity.ok(userCredentials);
    }

    @ExceptionHandler({SpotifyException.class})
    public ResponseEntity error(SpotifyException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    private SpotifyTracksCredentialDto mapSpotifyTracksToDto(List<SpotifyTrack> tracks, UserCredentials userCredentials) {
        SpotifyTracksCredentialDto dto = new SpotifyTracksCredentialDto();
        dto.setTracks(tracks);
        dto.setUserCredentials(userCredentials);
        return dto;
    }
}
