package org.example.be.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "MealFood")
public class MealFood {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn(name = "meal_id", nullable = false)
    @JsonIgnore
    private MyMeal meal;
    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;
    @Column(nullable = false)
    private double grams;

    public MealFood() {
    }

    ;

    public MealFood(MyMeal meal, Food food, double grams) {
        this.meal = meal;
        this.food = food;
        this.grams = grams;
    }

    public String getId() {
        return id;
    }

    public MyMeal getMeal() {
        return meal;
    }

    public void setMeal(MyMeal meal) {
        this.meal = meal;
    }

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }

    public double getGrams() {
        return grams;
    }

    public void setGrams(double grams) {
        this.grams = grams;
    }

    @Override
    public String toString() {
        return "MealFood{" +
                "id='" + id + '\'' +
                ", meal=" + meal +
                ", food=" + food +
                ", grams=" + grams +
                '}';
    }
}
