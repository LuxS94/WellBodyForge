package org.example.be.repositories;

import org.example.be.entities.MyMeal;
import org.example.be.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface MyMealRepo extends JpaRepository<MyMeal, String> {
    Page<MyMeal> findByDate(LocalDate date, Pageable pageable);

    Page<MyMeal> findByUser(User user, Pageable pageable);

    Page<MyMeal> findByDateAndUser(User user, LocalDate date, Pageable pageable);

    Optional<MyMeal> findByIdAndUser(String id, User user);
}
