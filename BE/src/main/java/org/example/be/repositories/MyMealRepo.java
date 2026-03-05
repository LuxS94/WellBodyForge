package org.example.be.repositories;

import org.example.be.entities.MyMeal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface MyMealRepo extends JpaRepository<MyMeal, String> {
    Page<MyMeal> findByDate(LocalDate date, Pageable pageable);
}
