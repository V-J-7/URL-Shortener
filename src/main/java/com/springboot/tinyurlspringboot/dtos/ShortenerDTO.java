package com.springboot.tinyurlspringboot.dtos;

public class ShortenerDTO {
    String originalURL;
    String shortURL;
    String urlName;
    public ShortenerDTO(String originalURL, String shortURL,String urlName) {
        this.originalURL = originalURL;
        this.shortURL = shortURL;
        this.urlName = urlName;
    }
    public String getOriginalURL() {
        return originalURL;
    }
    public String getShortURL() {
        return shortURL;
    }
    public String geturlName() {
        return urlName;
    }
}
