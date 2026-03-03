package org.example.be.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Meals")
public class MyMeal {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @ManyToOne
    @JoinColumn
    private User user;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private LocalDate date;
    @OneToMany(
            mappedBy = "meal",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<MealFood> mealFoods = new ArrayList<>();
    private double tot_kcal;
    private double tot_protein;
    private double tot_carbs;
    private double tot_fat;

    public MyMeal() {
    }

    public MyMeal(User user, String description, LocalDate date) {
        this.user = user;
        this.description = description;
        this.date = date;
    }

    //to make dynamic attributes
    @PostLoad //execute after jpa loads entity from DB
    @PostPersist // execute after entity has been saved in DB
    @PostUpdate //execute after entity has been updated
    private void calculateTotal() {
        tot_kcal = mealFoods.stream()
                .mapToDouble(mf -> (mf.getFood().getKcal() / 100.0) * mf.getGrams())
                .sum();
        tot_protein = mealFoods.stream()
                .mapToDouble(mf -> (mf.getFood().getProtein() / 100.0) * mf.getGrams())
                .sum();
        tot_carbs = mealFoods.stream()
                .mapToDouble(mf -> (mf.getFood().getCarbs() / 100.0) * mf.getGrams())
                .sum();
        tot_fat = mealFoods.stream()
                .mapToDouble(mf -> (mf.getFood().getFat() / 100.0) * mf.getGrams())
                .sum();
    }

    public String getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<MealFood> getMealFoods() {
        return mealFoods;
    }

    public void setMealFoods(List<MealFood> mealFoods) {
        this.mealFoods = mealFoods;
    }

    public double getTot_kcal() {
        return tot_kcal;
    }

    public double getTot_carbs() {
        return tot_carbs;
    }

    public double getTot_protein() {
        return tot_protein;
    }


    public double getTot_fat() {
        return tot_fat;
    }


    @Override
    public String toString() {
        return "MyMeal{" +
                "id='" + id + '\'' +
                ", user=" + user +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", mealFoods=" + mealFoods +
                ", tot_kcal=" + tot_kcal +
                ", tot_protein=" + tot_protein +
                ", tot_carbs=" + tot_carbs +
                ", tot_fat=" + tot_fat +
                '}';
    }
}

;

