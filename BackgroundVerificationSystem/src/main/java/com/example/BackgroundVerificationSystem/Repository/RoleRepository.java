package com.example.BackgroundVerificationSystem.Repository;

import com.example.BackgroundVerificationSystem.Enum.ERole;
import com.example.BackgroundVerificationSystem.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(ERole name);
}
