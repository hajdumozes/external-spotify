package com.example.externalspotify.controller;

import com.example.externalspotify.config.UserCredentials;
import com.example.externalspotify.dto.CheckedTrackCredentialDto;
import com.example.externalspotify.dto.SpotifyPlayListCredentialDto;
import com.example.externalspotify.dto.SpotifyTracksCredentialDto;
import com.example.externalspotify.entity.Id3Tag;
import com.example.externalspotify.entity.SpotifyPlaylist;
import com.example.externalspotify.entity.SpotifyTrack;
import com.example.externalspotify.exception.SpotifyException;
import com.example.externalspotify.service.AuthService;
import com.example.externalspotify.service.SpotifyApiService;
import com.example.externalspotify.entity.search.TrackSearchContent;
import com.example.externalspotify.service.SpotifyPlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SpotifyController {
    @Autowired
    private SpotifyApiService spotifyApiService;
    @Autowired
    private SpotifyPlaylistService spotifyPlaylistService;
    @Autowired
    private AuthService authService;

    @PostMapping("/track")
    public ResponseEntity<SpotifyTracksCredentialDto> getFromSpotify(@RequestBody Id3Tag id3Tag, @RequestParam String accessToken, @RequestParam String refreshToken) {
        List<SpotifyTrack> tracks = processSearch(id3Tag, accessToken);
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

    @GetMapping("/check-liked-tracks")
    public ResponseEntity<CheckedTrackCredentialDto> checkLikedTracks(@RequestParam String ids, @RequestParam String accessToken, @RequestParam String refreshToken) {
        Boolean[] areTracksLiked = spotifyApiService.checkFollowedTracks(ids, accessToken);
        UserCredentials userCredentials = authService.refreshTokens(refreshToken);
        CheckedTrackCredentialDto dto = mapCheckedLikedTracksToDto(areTracksLiked, userCredentials);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/check-saved-albums")
    public ResponseEntity<CheckedTrackCredentialDto> checkSavedAlbums(@RequestParam String ids, @RequestParam String accessToken, @RequestParam String refreshToken) {
        Boolean[] areTracksLiked = spotifyApiService.checkSavedAlbums(ids, accessToken);
        UserCredentials userCredentials = authService.refreshTokens(refreshToken);
        CheckedTrackCredentialDto dto = mapCheckedLikedTracksToDto(areTracksLiked, userCredentials);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/check-followed-artists")
    public ResponseEntity<CheckedTrackCredentialDto> checkFollowedArtist(@RequestParam String ids, @RequestParam String accessToken, @RequestParam String refreshToken) {
        Boolean[] areTracksLiked = spotifyApiService.checkFollowedArtists(ids, accessToken);
        UserCredentials userCredentials = authService.refreshTokens(refreshToken);
        CheckedTrackCredentialDto dto = mapCheckedLikedTracksToDto(areTracksLiked, userCredentials);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/user-playlists")
    public ResponseEntity<SpotifyPlayListCredentialDto> getUserPlaylists(@RequestParam String accessToken, @RequestParam String refreshToken) {
        List<SpotifyPlaylist> playlists = spotifyPlaylistService.getUserPlaylists(accessToken);
        UserCredentials userCredentials = authService.refreshTokens(refreshToken);
        SpotifyPlayListCredentialDto dto = mapSpotifyPlayListsToDto(playlists, userCredentials);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/add-to-playlist")
    public ResponseEntity<UserCredentials> addToPlaylist(
            @RequestParam String playlistId,
            @RequestParam String trackIds,
            @RequestParam String accessToken,
            @RequestParam String refreshToken) {
        spotifyPlaylistService.addToPlaylist(playlistId, trackIds, accessToken);
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

    private CheckedTrackCredentialDto mapCheckedLikedTracksToDto(Boolean[] areTracksLiked, UserCredentials userCredentials) {
        CheckedTrackCredentialDto dto = new CheckedTrackCredentialDto();
        dto.setLiked(areTracksLiked);
        dto.setUserCredentials(userCredentials);
        return dto;
    }

    private SpotifyPlayListCredentialDto mapSpotifyPlayListsToDto(List<SpotifyPlaylist> playlists, UserCredentials userCredentials) {
        SpotifyPlayListCredentialDto dto = new SpotifyPlayListCredentialDto();
        dto.setPlaylists(playlists);
        dto.setUserCredentials(userCredentials);
        return dto;
    }

    private List<SpotifyTrack> processSearch(Id3Tag id3Tag, String accessToken) {
        List<SpotifyTrack> results = spotifyApiService.searchForTrack(id3Tag, TrackSearchContent.ALL, accessToken);
        if (results.size() == 0) {
            results = spotifyApiService.searchForTrack(id3Tag, TrackSearchContent.WITHOUT_YEAR, accessToken);
        }
        if (results.size() == 0) {
            results = spotifyApiService.searchForTrack(id3Tag, TrackSearchContent.WITHOUT_YEAR_AND_ALBUM, accessToken);
        }
        if (results.size() == 0) {
            results = spotifyApiService.searchForTrack(id3Tag, TrackSearchContent.WITHOUT_YEAR_AND_ARTIST, accessToken);
        }
        return results;
    }
}
