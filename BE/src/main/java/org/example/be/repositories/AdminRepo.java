package org.example.be.repositories;

import org.example.be.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin, String> {
    Optional<Admin> findByUsername(String username);

    Optional<Admin> findByEmail(String email);
}
