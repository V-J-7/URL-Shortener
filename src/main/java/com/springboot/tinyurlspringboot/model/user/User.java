package com.springboot.tinyurlspringboot.model.user;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {
    @Column(name="email",nullable=false)
    String email;

    @Column(name="password",nullable=false)
    String passwordHash;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="user_id",unique=true)
    int userId;

    public User(String email, String password) {
        this.email = email;
        this.passwordHash = password;
    }

    public User() {

    }
    void setEmail(String email) {
        this.email = email;
    }
    void setPassword(String password) {
        this.passwordHash = password;
    }
    void setUserId(int userId) {
        this.userId = userId;
    }
    public String getPassword() {
        return passwordHash;
    }

    public String getEmail() {
        return email;
    }
    public int getUserId() {
        return userId;
    }
}
