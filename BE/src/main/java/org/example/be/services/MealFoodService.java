package org.example.be.services;

import org.example.be.dto.MealFoodDTO;
import org.example.be.entities.*;
import org.example.be.exceptions.NotFoundException;
import org.example.be.repositories.FoodRepo;
import org.example.be.repositories.MealFoodRepo;
import org.example.be.repositories.MyMealRepo;
import org.example.be.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class MealFoodService {
    private final MealFoodRepo mfr;
    private final MyMealRepo mr;
    private final FoodRepo fr;
    private final UserRepo ur;

    @Autowired
    public MealFoodService(MealFoodRepo mfr, MyMealRepo mr, FoodRepo fr, UserRepo ur) {
        this.mfr = mfr;
        this.mr = mr;
        this.fr = fr;
        this.ur = ur;
    }

    public Page<MealFood> findAll(int page, int size, String orderBy, String sortCriteria) {
        if (size > 100 || size < 0) size = 10;
        if (page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, size,
                sortCriteria.equals("desc") ? Sort.by(orderBy).descending() : Sort.by(orderBy));
        return this.mfr.findAll(pageable);
    }

    public Page<MealFood> findAllMy(int page, int size, String orderBy, String sortCriteria, UserSecurity currentUser) {

        if (size > 100 || size < 0) size = 10;
        if (page < 0) page = 0;

        Pageable pageable = PageRequest.of(page, size,
                sortCriteria.equals("desc") ? Sort.by(orderBy).descending() : Sort.by(orderBy));

        return this.mfr.findByMeal_User_Id(currentUser.getId(), pageable);
    }

    public MealFood find(String id) {
        return this.mfr.findById(id).orElseThrow(() -> new NotFoundException("Meal not found"));
    }

    public MealFood findMy(String mealFoodId, UserSecurity currentUser) {

        return this.mfr.findByIdAndMeal_User_Id(mealFoodId, currentUser.getId())
                .orElseThrow(() -> new NotFoundException("MealFood not found"));
    }

    public MealFood adCreate(MealFoodDTO body) {
        MealFood m = new MealFood(this.mr.findById(body.mealId()).orElseThrow(() -> new NotFoundException("Meal not found")), this.fr.findById(body.foodId()).orElseThrow(() -> new NotFoundException("Food not found")), body.grams());
        return this.mfr.save(m);
    }

    public MealFood create(MealFoodDTO body, UserSecurity user) {
        User f = this.ur.findById(user.getId()).orElseThrow(() -> new NotFoundException("User not found"));
        MyMeal mm = this.mr.findByIdAndUser(body.mealId(), f).orElseThrow(() -> new NotFoundException("Meal not found"));
        Food fo = this.fr.findById(body.foodId()).orElseThrow(() -> new NotFoundException("Food not found"));
        MealFood m = new MealFood(mm, fo, body.grams());
        return this.mfr.save(m);
    }

    ;

    public MealFood update(String mealFoodId, MealFoodDTO body, UserSecurity user) {
        MealFood m = this.mfr.findByIdAndMeal_User_Id(mealFoodId, user.getId()).orElseThrow(() -> new NotFoundException("Meal not found"));
        User f = this.ur.findById(user.getId()).orElseThrow(() -> new NotFoundException("User not found"));
        MyMeal mm = this.mr.findByIdAndUser(body.mealId(), f).orElseThrow(() -> new NotFoundException("Meal not found"));
        Food fo = this.fr.findById(body.foodId()).orElseThrow(() -> new NotFoundException("Food not found"));
        m.setMeal(mm);
        m.setFood(fo);
        m.setGrams(body.grams());
        return this.mfr.save(m);
    }

    public MealFood adUpdate(String mealFoodId, MealFoodDTO body) {
        MealFood m = this.mfr.findById(mealFoodId).orElseThrow(() -> new NotFoundException("Meal not found"));
        MyMeal mm = this.mr.findById(body.mealId()).orElseThrow(() -> new NotFoundException("Meal not found"));
        Food fo = this.fr.findById(body.foodId()).orElseThrow(() -> new NotFoundException("Food not found"));
        m.setMeal(mm);
        m.setFood(fo);
        m.setGrams(body.grams());
        return this.mfr.save(m);
    }

    public void delete(String mealFoodId, UserSecurity currentUser) {

        MealFood m = mfr.findByIdAndMeal_User_Id(mealFoodId, currentUser.getId())
                .orElseThrow(() -> new NotFoundException("MealFood not found or not yours"));
        mfr.delete(m);
    }

    public void adDelete(String mealFoodId) {
        MealFood m = mfr.findById(mealFoodId).orElseThrow(() -> new NotFoundException("MealFood not found or not yours"));
        mfr.delete(m);
    }

}
