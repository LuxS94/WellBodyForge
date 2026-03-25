package org.example.be.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Targets")
public class Target {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @OneToOne
    @JoinColumn(nullable = false)
    private User user;
    private double kcal;
    private double protein;
    private double carbs;
    private double fat;

    public Target() {
    }

    ;

    public Target(User user) {
        this.user = user;

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

    public double getKcal() {
        return kcal;
    }

    public void setKcal(double kcal) {
        this.kcal = kcal;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    @Override
    public String toString() {
        return "Target{" +
                "id='" + id + '\'' +
                ", user=" + user +
                ", kcal=" + kcal +
                ", protein=" + protein +
                ", carbs=" + carbs +
                ", fat=" + fat +
                '}';
    }
}
