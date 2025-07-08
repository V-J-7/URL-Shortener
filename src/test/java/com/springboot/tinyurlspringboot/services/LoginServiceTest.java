package com.springboot.tinyurlspringboot.services;

import com.springboot.tinyurlspringboot.model.user.User;
import com.springboot.tinyurlspringboot.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class LoginServiceTest {
    @Autowired
    private LoginService loginService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
//    @BeforeEach
//    public void setup() {
//        userRepository.deleteAll();
//        userService.addUser("daw@gmail.com","Abc123");
//    }
    @Test
    void testSuccess() {
        boolean login=loginService.authenticate("daw@gmail.com","Abc123");
        assertTrue(login);
    }
    @Test
    void testFail_wrongPassword() {
        boolean login=loginService.authenticate("daw@gmail.com","Pqr123");
        assertFalse(login);
    }
    @Test
    void testFail_noEmail() {
        boolean login=loginService.authenticate("abc@gmail.com","abc123");
        assertTrue(login);
    }
}
