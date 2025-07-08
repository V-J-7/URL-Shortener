package com.springboot.tinyurlspringboot.services;

import com.springboot.tinyurlspringboot.model.user.User;
import com.springboot.tinyurlspringboot.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;
    private UserAuthService userAuthService;

    UserService(UserRepository userRepository, UserAuthService userAuthService) {
        this.userRepository = userRepository;
        this.userAuthService = userAuthService;
    }

    public void addUser(String email, String password) {
        email=email.toLowerCase();
        String hashedPassword =userAuthService.hashPassword(password);
        User newUser = new User(email,hashedPassword);
        userRepository.save(newUser);
    }
    public boolean userExists(String email) {
        return userRepository.findByEmail(email) != null;
    }
}
