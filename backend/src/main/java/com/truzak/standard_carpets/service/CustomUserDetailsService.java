package com.truzak.standard_carpets.service;

import com.truzak.standard_carpets.config.AppUser;
import com.truzak.standard_carpets.entity.Role;
import com.truzak.standard_carpets.entity.User;
import com.truzak.standard_carpets.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Role role : user.getRoles()) {
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.getName());
            authorities.add(authority);
        }

        return new AppUser(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                authorities,
                true,true,
                true,true
        );
    }
}
