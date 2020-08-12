package com.example.externalspotify.entity;

import lombok.Data;

import java.util.List;

@Data
public class Id3Tag {
    private String album;
    private String albumArtist;
    private String artist;
    private List<String> artists;
    private int year;
    private String title;
}
