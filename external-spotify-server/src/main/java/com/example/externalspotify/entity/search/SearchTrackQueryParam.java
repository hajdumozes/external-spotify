package com.example.externalspotify.entity.search;

import lombok.Builder;

@Builder
public class SearchTrackQueryParam {
    private String title;
    private String album;
    private String artist;
    private Integer year;

    public String getParameterizedString() {
        return ""
                .concat(title != null ? getTitleParam() + " " : "")
                .concat(album != null ? getAlbumParam() + " " : "")
                .concat(artist != null ? getArtistParam() + " " : "")
                .concat(year !=  null ? getYearParam() : "");
    }

    private String getTitleParam() {
        return "track: " + title;
    }

    private String getAlbumParam() {
        return "album: " + album;
    }

    private String getArtistParam() {
        return "artist: " + artist;
    }

    private String getYearParam() {
        return "year: " + year;
    }
}
