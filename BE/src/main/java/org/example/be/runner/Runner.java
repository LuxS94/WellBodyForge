package org.example.be.runner;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.be.entities.Admin;
import org.example.be.entities.Food;
import org.example.be.repositories.AdminRepo;
import org.example.be.repositories.FoodRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;


@Component
public class Runner implements CommandLineRunner {
    @Autowired
    private FoodRepo fr;
    @Autowired
    private AdminRepo ar;
    @Autowired
    private PasswordEncoder pw;
    @Value("${admin.username}")
    private String adminUsername;
    @Value("${admin.password}")
    private String adminPassword;
    @Value("${admin.email}")
    private String adminEmail;

    @Override
    public void run(String... args) throws Exception {
        //To populate my DB with all foods
        ObjectMapper mapper = new ObjectMapper(); //transform json in java obj
        ClassPathResource res = new ClassPathResource("Common_Foods.json"); //loads files in resources
        InputStream inputStream = res.getInputStream(); //data's reading-flow
        List<Food> foods = mapper.readValue(inputStream, new TypeReference<List<Food>>() {
        });//TtpeReference-> to denot in which type json will be convertied
        if (fr.count() == 0) {
            fr.saveAll(foods);//to save only once
            System.out.println("Foods imported!");
        }
//to create an admin by default
        if (ar.count() == 0) {
            Admin admin = new Admin();
            admin.setUsername(adminUsername);
            admin.setEmail(adminEmail);
            admin.setPassword(pw.encode(adminPassword));
            ar.save(admin);

            System.out.println("Admin created!");
        }

    }

}
