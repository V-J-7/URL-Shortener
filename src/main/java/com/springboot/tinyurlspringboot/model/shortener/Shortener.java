package com.springboot.tinyurlspringboot.model.shortener;

import jakarta.persistence.*;
import com.springboot.tinyurlspringboot.model.user.User;

@Entity
@Table(name="shortener")
public class Shortener {

    @Column(name="original",nullable = false,unique = true,columnDefinition = "TEXT")
    private String original;

    @Id
    @Column(name="short",nullable = false,unique = true)
    private String short_url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    public Shortener(String original, String short_url, User user) {
        this.original = original;
        this.short_url = short_url;
        this.user = user;
    }
    public Shortener() {

    }
    void setOriginal(String original) {
        this.original = original;
    }
    void setShort(String short_url) {
        this.short_url = short_url;
    }
    void setUser(User user) {
        this.user = user;
    }

    public String getOriginal() {
        return original;
    }
    public String getShort_url() {
        return short_url;
    }
}
