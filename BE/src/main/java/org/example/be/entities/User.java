package org.example.be.entities;

import jakarta.persistence.*;
import org.example.be.enums.Lifestyle;
import org.example.be.enums.Plan;
import org.example.be.enums.Sex;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private double height;
    @Column(nullable = false)
    private double weight;
    @Column(nullable = false)
    private int age;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Sex sex;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Lifestyle lifestyle;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Plan plan;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)//to update everytime target
    private Target target;

    public User() {
    }

    ;

    public User(String username, String email, String password, double height, double weight, int age, Sex sex, Lifestyle lifestyle, Plan plan) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.sex = sex;
        this.lifestyle = lifestyle;
        this.plan = plan;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public Lifestyle getLifestyle() {
        return lifestyle;
    }

    public void setLifestyle(Lifestyle lifestyle) {
        this.lifestyle = lifestyle;
    }

    public Plan getPlan() {
        return plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", height=" + height +
                ", weight=" + weight +
                ", age=" + age +
                ", sex=" + sex +
                ", lifestyle=" + lifestyle +
                ", plan=" + plan +
                '}';
    }
}
