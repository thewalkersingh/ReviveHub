package com.revivehub.repository;
import com.revivehub.model.Role;
import com.revivehub.model.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(RoleType role);
}