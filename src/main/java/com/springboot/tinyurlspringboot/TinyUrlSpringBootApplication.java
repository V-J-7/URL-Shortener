package com.springboot.tinyurlspringboot;

import com.springboot.tinyurlspringboot.model.user.User;
import com.springboot.tinyurlspringboot.repositories.UserRepository;
import com.springboot.tinyurlspringboot.services.LoginService;
import com.springboot.tinyurlspringboot.services.UserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@SpringBootApplication
public class TinyUrlSpringBootApplication {

    public static void main(String[] args) {
            SpringApplication.run(TinyUrlSpringBootApplication.class, args);
    }
}
