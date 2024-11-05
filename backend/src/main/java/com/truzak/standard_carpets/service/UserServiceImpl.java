package com.truzak.standard_carpets.service;

import com.truzak.standard_carpets.entity.Role;
import com.truzak.standard_carpets.entity.User;
import com.truzak.standard_carpets.repo.RoleRepo;
import com.truzak.standard_carpets.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepo userRepo,
                           RoleRepo roleRepo,
                           PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @Override
    public Optional<User> getUser(int id) {
        return userRepo.findById(id);
    }

    @Override
    public User getUserByUsername(String username) {
        User user =  userRepo.findByUsername(username);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return user;
    }

    @Override
    public List<Role> getRoles() {
        return roleRepo.findAll();
    }

    @Override
    public Role getRoleByName(String name) {
        return roleRepo.findByName(name);
    }

    @Override
    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    @Override
    public void deleteUser(int id) {
        userRepo.deleteById(id);
    }
}

