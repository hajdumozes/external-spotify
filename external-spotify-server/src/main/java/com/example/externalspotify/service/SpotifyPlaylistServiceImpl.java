package com.example.externalspotify.service;

import com.example.externalspotify.entity.SpotifyPlaylist;
import com.example.externalspotify.exception.SpotifyException;
import com.example.externalspotify.spotifyapi.SpotifyApiFactory;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.PlaylistSimplified;
import com.wrapper.spotify.requests.data.playlists.GetListOfCurrentUsersPlaylistsRequest;
import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpotifyPlaylistServiceImpl implements SpotifyPlaylistService {

    @Override
    public List<SpotifyPlaylist> getUserPlaylists(String token) {
        SpotifyApi spotifyApi = SpotifyApiFactory.createDefault();
        spotifyApi.setAccessToken(token);
        GetListOfCurrentUsersPlaylistsRequest request = spotifyApi.getListOfCurrentUsersPlaylists().build();
        try {
            Paging<PlaylistSimplified> paging = request.execute();
            PlaylistSimplified[] playlists = paging.getItems();
            return Arrays.stream(playlists).map(this::mapToSpotifyPlaylist).collect(Collectors.toList());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            throw new SpotifyException(e.getMessage());
        }
    }

    private SpotifyPlaylist mapToSpotifyPlaylist(PlaylistSimplified playlistSimplified) {
        SpotifyPlaylist spotifyPlaylist = new SpotifyPlaylist();
        spotifyPlaylist.setId(playlistSimplified.getId());
        spotifyPlaylist.setName(playlistSimplified.getName());
        spotifyPlaylist.setUrl(playlistSimplified.getExternalUrls().getExternalUrls().get("spotify"));
        return spotifyPlaylist;
    }
}
