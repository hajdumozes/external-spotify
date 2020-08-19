package com.example.externalspotify.entity.search;

import com.example.externalspotify.entity.Id3Tag;

public class TrackSearchQueryFactory {

    public static String getTrackSearchQuery(Id3Tag id3Tag, TrackSearchContent content) {
        switch (content) {
            case WITHOUT_YEAR:
                return getQueryParamsNoYear(id3Tag);
            case WITHOUT_YEAR_AND_ALBUM:
                return getQueryParamsArtistAndTitle(id3Tag);
            case WITHOUT_YEAR_AND_ARTIST:
                return getQueryParamsAlbumAndTitle(id3Tag);
            default:
                return getQueryParamsAll(id3Tag);
        }
    }

    private static String getQueryParamsAll(Id3Tag id3Tag) {
        SearchTrackQueryParam searchTrackQueryParam = SearchTrackQueryParam.builder()
                .album(id3Tag.getAlbum())
                .artist(id3Tag.getArtist())
                .title(id3Tag.getTitle())
                .year(id3Tag.getYear())
                .build();
        return searchTrackQueryParam.getParameterizedString();
    }

    private static String getQueryParamsNoYear(Id3Tag id3Tag) {
        SearchTrackQueryParam searchTrackQueryParam = SearchTrackQueryParam.builder()
                .album(id3Tag.getAlbum())
                .artist(id3Tag.getArtist())
                .title(id3Tag.getTitle())
                .build();
        return searchTrackQueryParam.getParameterizedString();
    }

    private static String getQueryParamsArtistAndTitle(Id3Tag id3Tag) {
        SearchTrackQueryParam searchTrackQueryParam = SearchTrackQueryParam.builder()
                .artist(id3Tag.getArtist())
                .title(id3Tag.getTitle())
                .build();
        return searchTrackQueryParam.getParameterizedString();
    }

    private static String getQueryParamsAlbumAndTitle(Id3Tag id3Tag) {
        SearchTrackQueryParam searchTrackQueryParam = SearchTrackQueryParam.builder()
                .album(id3Tag.getAlbum())
                .title(id3Tag.getTitle())
                .build();
        return searchTrackQueryParam.getParameterizedString();
    }
}
