package com.example.externalspotify.service;

import com.example.externalspotify.entity.SpotifyArtist;
import com.example.externalspotify.entity.Id3Tag;
import com.example.externalspotify.entity.SpotifyTrack;
import com.example.externalspotify.exception.SpotifyException;
import com.example.externalspotify.global.SpotifyApiSingleton;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.ArtistSimplified;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.Track;
import com.wrapper.spotify.requests.data.library.SaveTracksForUserRequest;
import com.wrapper.spotify.requests.data.search.simplified.SearchTracksRequest;
import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class SpotifyApiServiceImpl implements SpotifyApiService {
    private SpotifyApi spotifyApi = SpotifyApiSingleton.getInstance().getSpotifyApi();

    @Override
    public List<SpotifyTrack> searchForTrack(Id3Tag id3Tag) {
        SearchTracksRequest searchTracksRequest = spotifyApi.searchTracks(buildQueryParams(id3Tag)).build();
        try {
            Paging<Track> artistPaging = searchTracksRequest.execute();
            Track[] tracks = artistPaging.getItems();
            return Arrays.stream(tracks).map(this::mapTrackToSpotifyTrack).collect(Collectors.toList());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            throw new SpotifyException(e.getMessage());
        }
    }

    @Override
    public void likeTrack(String id) {
        SaveTracksForUserRequest saveTracksForUserRequest = spotifyApi.saveTracksForUser(id).build();
        try {
            CompletableFuture<String> stringFuture = saveTracksForUserRequest.executeAsync();
            stringFuture.get();
        } catch (CompletionException | InterruptedException | ExecutionException e) {
            throw new SpotifyException(e.getCause().getMessage());
        } catch (CancellationException e) {
            throw new SpotifyException("Async operation cancelled.");
        }
    }

    private String buildQueryParams(Id3Tag id3Tag) {
        return MessageFormat.format("track: {0} album: {1} artist: {2} year: {3}",
                id3Tag.getTitle(), id3Tag.getAlbum(), id3Tag.getArtist(), String.valueOf(id3Tag.getYear()));
    }

    private SpotifyTrack mapTrackToSpotifyTrack(Track track) {
        SpotifyTrack spotifyTrack = new SpotifyTrack();
        spotifyTrack.setAlbum(track.getAlbum().getName());
        spotifyTrack.setAlbumId(track.getAlbum().getId());
        String releaseDate = track.getAlbum().getReleaseDate();
        String releaseYear = releaseDate.substring(0, releaseDate.indexOf("-"));
        spotifyTrack.setYear(Integer.valueOf(releaseYear));
        spotifyTrack.setTitle(track.getName());
        spotifyTrack.setTrackId(track.getId());
        List<SpotifyArtist> artists = Arrays.stream(track.getArtists()).map(this::mapArtistToSpotifyArtist).collect(Collectors.toList());
        spotifyTrack.setArtists(artists);
        spotifyTrack.setUrl(track.getExternalUrls().getExternalUrls().get("spotify"));
        return spotifyTrack;
    }

    private SpotifyArtist mapArtistToSpotifyArtist(ArtistSimplified artist) {
        SpotifyArtist spotifyArtist = new SpotifyArtist();
        spotifyArtist.setName(artist.getName());
        spotifyArtist.setId(artist.getId());
        return spotifyArtist;
    }
}
