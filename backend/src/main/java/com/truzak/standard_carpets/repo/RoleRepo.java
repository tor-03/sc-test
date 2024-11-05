package com.truzak.standard_carpets.repo;

import com.truzak.standard_carpets.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role,Integer> {

    Role findByName(String name);
}
