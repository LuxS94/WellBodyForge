package org.example.be.services;

import org.example.be.dto.FoodDTO;
import org.example.be.entities.Food;
import org.example.be.enums.Type;
import org.example.be.exceptions.AlreadyExists;
import org.example.be.exceptions.NotFoundException;
import org.example.be.repositories.FoodRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class FoodService {
    private final FoodRepo fr;

    @Autowired
    public FoodService(FoodRepo fr) {
        this.fr = fr;
    }

    public Food create(FoodDTO body) {
        if (this.fr.findByName(body.name()).isPresent() && this.fr.findByType(body.type()).isPresent()) {
            throw new AlreadyExists("This food is already registered!");
        }
        Food nFood = new Food(body.type(), body.name(), body.kcal(), body.protein(), body.carbs(), body.fat());
        this.fr.save(nFood);
        return nFood;
    }

    public Food update(String name, Type type, FoodDTO body) {
        Food f = this.fr.findByNameAndType(name, type).orElseThrow(() -> new NotFoundException("Food not found"));
        if (f.getName() != body.name() && f.getType() != body.type()) {
            if (this.fr.findByName(body.name()).isPresent() && this.fr.findByType(body.type()).isPresent()) {
                throw new AlreadyExists("This food is already registered!");
            }
            ;
        }
        f.setType(body.type());
        f.setName(body.name());
        f.setKcal(body.kcal());
        f.setProtein(body.protein());
        f.setCarbs(body.carbs());
        f.setFat(body.fat());
        return this.fr.save(f);

    }

    public Page<Food> findAllFoods(int page, int size, String orderBy, String sortCriteria) {
        if (size > 100 || size < 0) size = 10;
        if (page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, size,
                sortCriteria.equals("desc") ? Sort.by(orderBy).descending() : Sort.by(orderBy));
        return this.fr.findAll(pageable);
    }

    public Food findByName(String name) {
        return this.fr.findByName(name).orElseThrow(() -> new NotFoundException("Food not found"));
    }

    public void delete(String name, Type type) {
        Food f = this.fr.findByNameAndType(name, type).orElseThrow(() -> new NotFoundException("Food not found"));
        this.fr.delete(f);
    }

}
