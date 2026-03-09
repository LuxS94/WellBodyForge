package org.example.be.controllers;

import org.example.be.dto.MealFoodDTO;
import org.example.be.entities.MealFood;
import org.example.be.entities.UserSecurity;
import org.example.be.services.MealFoodService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mealFood")
public class MealFoodController {
    private final MealFoodService mfs;

    public MealFoodController(MealFoodService mfs) {
        this.mfs = mfs;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<MealFood> showAll(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size,
                                  @RequestParam(defaultValue = "grams") String orderBy,
                                  @RequestParam(defaultValue = "asc") String sortCriteria) {
        return this.mfs.findAll(page, size, orderBy, sortCriteria);
    }//http://localhost:3001/mealFood/all

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public MealFood find(@PathVariable String id) {
        return this.mfs.find(id);
    }//http://localhost:3001/mealFood/{id}

    @GetMapping("/myAll")
    public Page<MealFood> findAllMy(@AuthenticationPrincipal UserSecurity user,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size,
                                    @RequestParam(defaultValue = "grams") String orderBy,
                                    @RequestParam(defaultValue = "asc") String sortCriteria) {
        return this.mfs.findAllMy(page, size, orderBy, sortCriteria, user);
    }//http://localhost:3001/mealFood/myAll

    @GetMapping("/my/{id}")
    public MealFood findMy(@PathVariable String id,
                           @AuthenticationPrincipal UserSecurity user) {
        return this.mfs.findMy(id, user);
    }//http://localhost:3001/mealFood/my/{id}

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public MealFood adCreate(@RequestBody MealFoodDTO body) {
        return this.mfs.adCreate(body);
    }//http://localhost:3001/mealFood

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public MealFood create(@RequestBody MealFoodDTO body, @AuthenticationPrincipal UserSecurity user) {
        return this.mfs.create(body, user);
    }//http://localhost:3001/mealFood/create

    @PutMapping("/updateMy/{id}")
    public MealFood updateMy(@PathVariable String id, @RequestBody MealFoodDTO body, @AuthenticationPrincipal UserSecurity user) {
        return this.mfs.update(id, body, user);
    }//http://localhost:3001/mealFood/updateMy/{id}

    @PutMapping("/{id}")
    public MealFood update(@PathVariable String id, @RequestBody MealFoodDTO body) {
        return this.mfs.adUpdate(id, body);
    }//http://localhost:3001/mealFood/{id}

    @DeleteMapping("/my/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMy(@PathVariable String id, @AuthenticationPrincipal UserSecurity user) {
        this.mfs.delete(id, user);
    }//http://localhost:3001/mealFood/my/{id}

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        this.mfs.adDelete(id);
    }//http://localhost:3001/mealFood/{id}
}
