package com.springboot.tinyurlspringboot.repositories;

import com.springboot.tinyurlspringboot.dtos.ShortenerDTO;
import com.springboot.tinyurlspringboot.model.shortener.Shortener;
import com.springboot.tinyurlspringboot.model.user.User;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShortenerRepository extends JpaRepository<Shortener,Long> {
    List<Shortener>findAllByUser(User user);
    Shortener findByOriginal(String originalUrl);
}