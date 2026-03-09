package org.example.be.repositories;

import org.example.be.entities.MealFood;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MealFoodRepo extends JpaRepository<MealFood, String> {
    Optional<MealFood> findByIdAndMeal_User_Id(String mealFoodId, String userId);

    Page<MealFood> findByMeal_User_Id(String userId, Pageable pageable);

}
