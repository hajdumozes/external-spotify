package com.example.externalspotify.controller;

import com.example.externalspotify.config.AuthModel;
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
        AuthModel authModel = authService.refreshTokens(refreshToken);
        SpotifyTracksCredentialDto dto = mapSpotifyTracksToDto(tracks, authModel);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/like-track")
    public ResponseEntity<AuthModel> likeSong(@RequestParam String ids, @RequestParam String accessToken, @RequestParam String refreshToken) {
        spotifyApiService.likeTrack(ids, accessToken);
        AuthModel authModel = authService.refreshTokens(refreshToken);
        return ResponseEntity.ok(authModel);
    }

    @GetMapping("/save-album")
    public ResponseEntity<AuthModel> saveAlbum(@RequestParam String ids, @RequestParam String accessToken, @RequestParam String refreshToken) {
        spotifyApiService.saveAlbum(ids, accessToken);
        AuthModel authModel = authService.refreshTokens(refreshToken);
        return ResponseEntity.ok(authModel);
    }

    @GetMapping("/follow-artist")
    public ResponseEntity<AuthModel> followArtist(@RequestParam String ids, @RequestParam String accessToken, @RequestParam String refreshToken) {
        spotifyApiService.followArtists(ids, accessToken);
        AuthModel authModel = authService.refreshTokens(refreshToken);
        return ResponseEntity.ok(authModel);
    }

    @ExceptionHandler({SpotifyException.class})
    public ResponseEntity error(SpotifyException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    private SpotifyTracksCredentialDto mapSpotifyTracksToDto(List<SpotifyTrack> tracks, AuthModel authModel) {
        SpotifyTracksCredentialDto dto = new SpotifyTracksCredentialDto();
        dto.setTracks(tracks);
        dto.setAuthModel(authModel);
        return dto;
    }
}
