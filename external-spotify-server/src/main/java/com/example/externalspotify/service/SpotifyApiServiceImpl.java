package com.example.externalspotify.service;

import com.example.externalspotify.entity.SpotifyArtist;
import com.example.externalspotify.entity.Id3Tag;
import com.example.externalspotify.entity.SpotifyTrack;
import com.example.externalspotify.exception.SpotifyException;
import com.example.externalspotify.spotifyapi.SpotifyApiFactory;
import com.example.externalspotify.entity.search.TrackSearchContent;
import com.example.externalspotify.entity.search.TrackSearchQueryFactory;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.enums.ModelObjectType;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.ArtistSimplified;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.Track;
import com.wrapper.spotify.requests.data.follow.CheckCurrentUserFollowsArtistsOrUsersRequest;
import com.wrapper.spotify.requests.data.follow.FollowArtistsOrUsersRequest;
import com.wrapper.spotify.requests.data.library.CheckUsersSavedAlbumsRequest;
import com.wrapper.spotify.requests.data.library.CheckUsersSavedTracksRequest;
import com.wrapper.spotify.requests.data.library.SaveAlbumsForCurrentUserRequest;
import com.wrapper.spotify.requests.data.library.SaveTracksForUserRequest;
import com.wrapper.spotify.requests.data.search.simplified.SearchTracksRequest;
import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class SpotifyApiServiceImpl implements SpotifyApiService {

    @Override
    public List<SpotifyTrack> searchForTrack(Id3Tag id3Tag, TrackSearchContent trackSearchContent, String token) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        spotifyApi.setAccessToken(token);
        String qParam = TrackSearchQueryFactory.getTrackSearchQuery(id3Tag, trackSearchContent);
        SearchTracksRequest searchTracksRequest = spotifyApi.searchTracks(qParam).build();
        try {
            Paging<Track> artistPaging = searchTracksRequest.execute();
            Track[] tracks = artistPaging.getItems();
            return Arrays.stream(tracks).map(this::mapTrackToSpotifyTrack).collect(Collectors.toList());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            throw new SpotifyException(e.getMessage());
        }
    }

    @Override
    public void likeTrack(String ids, String token) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        spotifyApi.setAccessToken(token);
        SaveTracksForUserRequest saveTracksForUserRequest = spotifyApi.saveTracksForUser(ids).build();
        try {
            CompletableFuture<String> stringFuture = saveTracksForUserRequest.executeAsync();
            stringFuture.get();
        } catch (CompletionException | InterruptedException | ExecutionException e) {
            throw new SpotifyException(e.getCause().getMessage());
        } catch (CancellationException e) {
            throw new SpotifyException("Async operation cancelled.");
        }
    }

    @Override
    public void saveAlbum(String ids, String token) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        spotifyApi.setAccessToken(token);
        SaveAlbumsForCurrentUserRequest saveAlbumsForCurrentUserRequest = spotifyApi
                .saveAlbumsForCurrentUser(ids)
                .build();
        try {
            CompletableFuture<String> stringFuture = saveAlbumsForCurrentUserRequest.executeAsync();
            stringFuture.get();
        } catch (CompletionException | InterruptedException | ExecutionException e) {
            throw new SpotifyException(e.getCause().getMessage());
        } catch (CancellationException e) {
            throw new SpotifyException("Async operation cancelled.");
        }
    }

    @Override
    public void followArtists(String ids, String token) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        spotifyApi.setAccessToken(token);
        String[] array = ids.split(",");
        FollowArtistsOrUsersRequest followArtistsOrUsersRequest = spotifyApi
                .followArtistsOrUsers(ModelObjectType.ARTIST, array)
                .build();
        try {
            CompletableFuture<String> stringFuture = followArtistsOrUsersRequest.executeAsync();
            stringFuture.get();
        } catch (CompletionException | InterruptedException | ExecutionException e) {
            throw new SpotifyException(e.getCause().getMessage());
        } catch (CancellationException e) {
            throw new SpotifyException("Async operation cancelled.");
        }
    }

    @Override
    public Boolean[] checkFollowedTracks(String ids, String token) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        spotifyApi.setAccessToken(token);
        CheckUsersSavedTracksRequest checkUsersSavedTracksRequest  = spotifyApi
                .checkUsersSavedTracks(ids)
                .build();
        try {
            CompletableFuture<Boolean[]> booleansFuture = checkUsersSavedTracksRequest.executeAsync();
            return booleansFuture.get();
        } catch (CompletionException | InterruptedException | ExecutionException e) {
            throw new SpotifyException(e.getCause().getMessage());
        } catch (CancellationException e) {
            throw new SpotifyException("Async operation cancelled.");
        }
    }

    @Override
    public Boolean[] checkSavedAlbums(String ids, String token) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        spotifyApi.setAccessToken(token);
        CheckUsersSavedAlbumsRequest checkUsersSavedAlbumsRequest  = spotifyApi
                .checkUsersSavedAlbums(ids)
                .build();
        try {
            CompletableFuture<Boolean[]> booleansFuture = checkUsersSavedAlbumsRequest.executeAsync();
            return booleansFuture.get();
        } catch (CompletionException | InterruptedException | ExecutionException e) {
            throw new SpotifyException(e.getCause().getMessage());
        } catch (CancellationException e) {
            throw new SpotifyException("Async operation cancelled.");
        }
    }

    @Override
    public Boolean[] checkFollowedArtists(String ids, String token) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        spotifyApi.setAccessToken(token);
        String[] array = ids.split(",");
        CheckCurrentUserFollowsArtistsOrUsersRequest request  = spotifyApi
                .checkCurrentUserFollowsArtistsOrUsers(ModelObjectType.ARTIST, array)
                .build();
        try {
            CompletableFuture<Boolean[]> booleansFuture = request.executeAsync();
            return booleansFuture.get();
        } catch (CompletionException | InterruptedException | ExecutionException e) {
            throw new SpotifyException(e.getCause().getMessage());
        } catch (CancellationException e) {
            throw new SpotifyException("Async operation cancelled.");
        }
    }

    private SpotifyTrack mapTrackToSpotifyTrack(Track track) {
        SpotifyTrack spotifyTrack = new SpotifyTrack();
        spotifyTrack.setAlbum(track.getAlbum().getName());
        spotifyTrack.setAlbumId(track.getAlbum().getId());
        String releaseYear = getReleaseYear(track.getAlbum().getReleaseDate());
        spotifyTrack.setYear(Integer.valueOf(releaseYear));
        spotifyTrack.setTitle(track.getName());
        spotifyTrack.setTrackId(track.getId());
        List<SpotifyArtist> artists = Arrays.stream(track.getArtists()).map(this::mapArtistToSpotifyArtist).collect(Collectors.toList());
        spotifyTrack.setArtists(artists);
        spotifyTrack.setUrl(track.getExternalUrls().getExternalUrls().get("spotify"));
        spotifyTrack.setUri(track.getUri());
        spotifyTrack.setPreviewUrl(track.getPreviewUrl());
        return spotifyTrack;
    }

    private SpotifyArtist mapArtistToSpotifyArtist(ArtistSimplified artist) {
        SpotifyArtist spotifyArtist = new SpotifyArtist();
        spotifyArtist.setName(artist.getName());
        spotifyArtist.setId(artist.getId());
        return spotifyArtist;
    }

    private String getReleaseYear(String date) {
        if (isFullDate(date)) {
            return date.substring(0, date.indexOf("-"));
        } else {
            return date;
        }
    }

    private boolean isFullDate(String date) {
        return date.contains("-");
    }
}
