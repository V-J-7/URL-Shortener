package com.springboot.tinyurlspringboot.dtos;

public class LoginDTO {
    private String email;
    private String password;
    LoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
}
