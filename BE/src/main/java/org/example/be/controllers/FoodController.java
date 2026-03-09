package org.example.be.controllers;

import org.example.be.dto.FoodDTO;
import org.example.be.entities.Food;
import org.example.be.enums.Type;
import org.example.be.services.FoodService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/food")
public class FoodController {
    private final FoodService fs;

    public FoodController(FoodService fs) {
        this.fs = fs;
    }//http://localhost:3001/food

    @GetMapping("/all")
    public Page<Food> showAll(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              @RequestParam(defaultValue = "kcal") String orderBy,
                              @RequestParam(defaultValue = "asc") String sortCriteria) {
        return this.fs.findAllFoods(page, size, orderBy, sortCriteria);
    }//http://localhost:3001/food/all

    @GetMapping("/find")
    public Food findByNameAndType(@RequestParam String name, @RequestParam Type type) {
        return this.fs.findByNameAndType(name, type);
    }//http://localhost:3001/food/find

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Food add(@RequestBody FoodDTO body) {
        return this.fs.create(body);
    }//http://localhost:3001/food/add

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Food update(@PathVariable String id, @RequestBody FoodDTO body) {
        return this.fs.update(id, body);
    }//http://localhost:3001/food/{id}

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable String id) {
        this.fs.delete(id);
    }//http://localhost:3001/food/{id}
}
