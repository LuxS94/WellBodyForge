package org.example.be.repositories;

import org.example.be.entities.MyMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyMealRepo extends JpaRepository<MyMeal, String> {
}
