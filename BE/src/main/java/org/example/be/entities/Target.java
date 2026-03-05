package org.example.be.entities;

import jakarta.persistence.*;
import org.example.be.enums.Lifestyle;
import org.example.be.enums.Plan;
import org.example.be.enums.Sex;

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

    @PrePersist  // execute before insert in DB
    @PreUpdate   // execute before update DB
    public void calculate() {
        if (this.user == null) return;
        double BMR = 0; //basal metabolic rate
        double TDEE = 0;//lifestyle factor
        double FFP = 0;//factor for plan
        double proteinForKg = 0;
        double fatForKg = 0;

        if (user.getSex() == Sex.M) {
            BMR = 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * user.getAge() + 5;
        } else {
            BMR = 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * user.getAge() - 161;
        }
        ;
        if (user.getLifestyle() == Lifestyle.SEDENTARY) {
            TDEE = 1.2;
        }
        ;
        if (user.getLifestyle() == Lifestyle.MODERATELY_ACTIVE) {
            TDEE = 1.55;
        }
        ;
        if (user.getLifestyle() == Lifestyle.ATHLETIC) {
            TDEE = 1.75;
        }
        ;
        if (user.getPlan() == Plan.WEIGHT_LOSS) {
            FFP = 0.82;
        }
        ;
        if (user.getPlan() == Plan.MAINTENANCE) {
            FFP = 1.0;
        }
        ;
        if (user.getPlan() == Plan.BULK) {
            FFP = 1.15;
        }
        ;
        if (user.getPlan() == Plan.WEIGHT_LOSS) {
            proteinForKg = 2.2;
            fatForKg = 1.0;
        }
        ;
        if (user.getPlan() == Plan.MAINTENANCE) {
            proteinForKg = 2.0;
            fatForKg = 0.9;
        }
        ;
        if (user.getPlan() == Plan.BULK) {
            proteinForKg = 1.8;
            fatForKg = 1.0;
        }

        this.kcal = (BMR * TDEE) * FFP;
        this.protein = proteinForKg * user.getWeight();
        this.fat = fatForKg * user.getWeight();
        this.carbs = (this.kcal - (this.protein * 4 + this.fat * 9)) / 4;
    }

    public String getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        calculate();
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
