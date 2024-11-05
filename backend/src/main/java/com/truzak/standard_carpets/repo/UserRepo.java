package com.truzak.standard_carpets.repo;

import com.truzak.standard_carpets.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {
    User findByUsername(String username);
}
