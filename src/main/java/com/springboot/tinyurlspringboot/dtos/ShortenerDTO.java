package com.springboot.tinyurlspringboot.dtos;

public class ShortenerDTO {
    String originalURL;
    String shortURL;
    public ShortenerDTO(String originalURL, String shortURL) {
        this.originalURL = originalURL;
        this.shortURL = shortURL;
    }
    public String getOriginalURL() {
        return originalURL;
    }
    public String getShortURL() {
        return shortURL;
    }
}
