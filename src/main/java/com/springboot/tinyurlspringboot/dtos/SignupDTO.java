package com.springboot.tinyurlspringboot.dtos;

public class SignupDTO {
    private String email;
    private String password;
    SignupDTO(String email, String password) {
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
