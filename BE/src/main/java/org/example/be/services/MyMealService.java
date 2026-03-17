package org.example.be.services;

import org.example.be.dto.MyMealDTO;
import org.example.be.entities.MyMeal;
import org.example.be.entities.User;
import org.example.be.entities.UserSecurity;
import org.example.be.exceptions.NotFoundException;
import org.example.be.repositories.MyMealRepo;
import org.example.be.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MyMealService {
    private final MyMealRepo mmr;
    private final UserRepo ur;

    @Autowired
    public MyMealService(MyMealRepo mmr, UserRepo ur) {
        this.mmr = mmr;
        this.ur = ur;
    }

    public MyMeal create(UserSecurity user, MyMealDTO body) {
        String id = user.getId();
        User f = this.ur.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        MyMeal mm = new MyMeal(f, body.description(), body.date());
        return this.mmr.save(mm);
    }

    //only by my profile
    public Page<MyMeal> findAllMyMeals(UserSecurity user, int page, int size, String orderBy, String sortCriteria, String date) {
        if (size > 100 || size < 0) size = 10;
        if (page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, size,
                sortCriteria.equals("desc") ? Sort.by(orderBy).descending() : Sort.by(orderBy));
        if (date != null && !date.isEmpty()) {
            LocalDate localDate = LocalDate.parse(date); // converts string YYYY-MM-DD in LocalDate
            return this.mmr.findByDateAndUserId(localDate, user.getId(), pageable);
        }
        return this.mmr.findByUserId(user.getId(), pageable);
    }


    //admin
    public Page<MyMeal> findAllMeals(int page, int size, String orderBy, String sortCriteria) {
        if (size > 100 || size < 0) size = 10;
        if (page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, size,
                sortCriteria.equals("desc") ? Sort.by(orderBy).descending() : Sort.by(orderBy));
        return this.mmr.findAll(pageable);
    }

    public MyMeal update(String id, UserSecurity user, MyMealDTO body) {
        String uid = user.getId();
        User u = this.ur.findById(uid).orElseThrow(() -> new NotFoundException("User not found"));
        MyMeal f = this.mmr.findByIdAndUser(id, u).orElseThrow(() -> new NotFoundException("Meal not found"));
        f.setDescription(body.description());
        f.setDate(body.date());
        return this.mmr.save(f);
    }

    //admin
    public void deleteMeal(String id) {
        MyMeal m = this.mmr.findById(id).orElseThrow(() -> new NotFoundException("Meal not found"));
        this.mmr.delete(m);
    }

    public MyMeal updateAd(String id, MyMealDTO body) {
        MyMeal f = this.mmr.findById(id).orElseThrow(() -> new NotFoundException("Meal not found"));
        f.setDescription(body.description());
        f.setDate(body.date());
        return this.mmr.save(f);
    }

    //user
    public void deleteMyMeal(UserSecurity user, String id) {
        User f = this.ur.findById(user.getId()).orElseThrow(() -> new NotFoundException("User not found"));
        MyMeal m = this.mmr.findByIdAndUser(id, f).orElseThrow(() -> new NotFoundException("Meal not found"));
        this.mmr.delete(m);
    }

}
