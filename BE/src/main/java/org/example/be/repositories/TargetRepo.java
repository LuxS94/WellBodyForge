package org.example.be.repositories;

import org.example.be.entities.Target;
import org.example.be.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TargetRepo extends JpaRepository<Target, String> {
    Optional<Target> findByUser(User user);
}
