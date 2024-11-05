package com.truzak.standard_carpets.service;

import com.truzak.standard_carpets.entity.Role;
import com.truzak.standard_carpets.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getUsers();

    Optional<User> getUser(int id);

    User getUserByUsername(String username);

    List<Role> getRoles();

    Role getRoleByName(String name);

    void saveUser(User user);

    void deleteUser(int id);
}
