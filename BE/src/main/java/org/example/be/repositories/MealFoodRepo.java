package org.example.be.repositories;

import org.example.be.entities.MealFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealFoodRepo extends JpaRepository<MealFood, String> {
}
