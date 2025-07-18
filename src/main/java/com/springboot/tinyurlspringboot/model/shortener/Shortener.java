package com.springboot.tinyurlspringboot.model.shortener;

import jakarta.persistence.*;
import com.springboot.tinyurlspringboot.model.user.User;

@Entity
@Table(name="shortener")

public class Shortener {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="original",nullable = false,columnDefinition = "TEXT")
    private String original;

    @Column(name="url_type")
    private String urlName;

    @Column(name="short",nullable = false)
    private String shortUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    public Shortener(String original, String shortUrl, String urlName,User user) {
        this.original = original;
        this.shortUrl = shortUrl;
        this.user = user;
        this.urlName = urlName;
    }
    public Shortener() {

    }
    void setOriginal(String original) {
        this.original = original;
    }
    void setShort(String shortUrl) {
        this.shortUrl = this.shortUrl;
    }
    void setUser(User user) {
        this.user = user;
    }

    public String getOriginal() {
        return original;
    }
    public String getShortUrl() {
        return shortUrl;
    }
    public String getUrlName() {return urlName;}
}
