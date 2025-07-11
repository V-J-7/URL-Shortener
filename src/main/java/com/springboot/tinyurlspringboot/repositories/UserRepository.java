package com.springboot.tinyurlspringboot.repositories;

import com.springboot.tinyurlspringboot.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);

}