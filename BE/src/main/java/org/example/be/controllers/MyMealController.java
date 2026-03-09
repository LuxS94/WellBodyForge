package org.example.be.controllers;

import org.example.be.dto.MyMealDTO;
import org.example.be.entities.MyMeal;
import org.example.be.entities.UserSecurity;
import org.example.be.exceptions.ValidationException;
import org.example.be.services.MyMealService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/meals")
public class MyMealController {
    private final MyMealService mms;

    public MyMealController(MyMealService mms) {
        this.mms = mms;
    }//http://localhost:3001/meals

    @GetMapping("/my")
    public Page<MyMeal> getMyMeals(
            @AuthenticationPrincipal UserSecurity currentUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "date") String orderBy,
            @RequestParam(defaultValue = "asc") String sortCriteria
    ) {

        return this.mms.findAllMyMeals(currentUser, page, size, orderBy, sortCriteria);
    }//http://localhost:3001/meals/my

    @GetMapping("/MyByDate")
    public Page<MyMeal> getMyMealsByDate(@AuthenticationPrincipal UserSecurity currentUser, @RequestParam LocalDate date, @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size,
                                         @RequestParam(defaultValue = "date") String orderBy,
                                         @RequestParam(defaultValue = "asc") String sortCriteria
    ) {
        return this.mms.findMyByDate(currentUser, date, page, size, orderBy, sortCriteria);
    }//http://localhost:3001/meals/MyByDate

    @GetMapping("/ByDate")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<MyMeal> getMealsByDate(@AuthenticationPrincipal UserSecurity currentUser, @RequestParam LocalDate date, @RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "10") int size,
                                       @RequestParam(defaultValue = "date") String orderBy,
                                       @RequestParam(defaultValue = "asc") String sortCriteria
    ) {
        return this.mms.findByDate(date, page, size, orderBy, sortCriteria);
    }//http://localhost:3001/meals/ByDate

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<MyMeal> findAllMeals(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "date") String orderBy,
            @RequestParam(defaultValue = "asc") String sortCriteria
    ) {

        return this.mms.findAllMeals(page, size, orderBy, sortCriteria);
    }//http://localhost:3001/meals/all


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MyMeal createMeal(@AuthenticationPrincipal UserSecurity currentUser, @RequestBody @Validated MyMealDTO body, BindingResult validationResults) {
        if (validationResults.hasErrors()) {

            List<String> errorsList = validationResults.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList();

            throw new ValidationException(errorsList);
        } else {
            return this.mms.create(currentUser, body);
        }
    }//http://localhost:3001/meals

    @PutMapping("/{id}/update")
    public MyMeal updateMyMeal(@AuthenticationPrincipal UserSecurity currentUser, @RequestBody @Validated MyMealDTO body, @PathVariable String id) {
        return this.mms.update(id, currentUser, body);
    }//http://localhost:3001/meals/{id}/update

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public MyMeal updateMeal(@RequestBody @Validated MyMealDTO body, @PathVariable String id) {
        return this.mms.updateAd(id, body);
    }//http://localhost:3001/meals/update/{id}

    @DeleteMapping("/{id}/delete")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMeal(@PathVariable String id) {
        this.mms.deleteMeal(id);
    }//http://localhost:3001/meals/{id}/delete


    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMyMeal(@AuthenticationPrincipal UserSecurity currentUser, String id) {
        this.mms.deleteMyMeal(currentUser, id);
    }//http://localhost:3001/meals/delete

    ;
}
