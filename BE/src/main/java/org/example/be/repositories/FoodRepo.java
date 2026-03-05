package org.example.be.repositories;

import org.example.be.entities.Food;
import org.example.be.enums.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FoodRepo extends JpaRepository<Food, String> {
    Optional<Food> findByName(String name);

    Optional<Food> findByType(Type type);

    Optional<Food> findByNameAndType(String name, Type type);
}
