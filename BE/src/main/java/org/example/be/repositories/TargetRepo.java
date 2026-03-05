package org.example.be.repositories;

import org.example.be.entities.Target;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TargetRepo extends JpaRepository<Target, String> {
}
