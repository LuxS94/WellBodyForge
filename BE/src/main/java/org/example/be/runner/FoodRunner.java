package org.example.be.runner;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.be.entities.Food;
import org.example.be.repositories.FoodRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

//To populate my DB with all foods
@Component
public class FoodRunner implements CommandLineRunner {
    @Autowired
    private FoodRepo fr;

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper(); //transform json in java obj
        ClassPathResource res = new ClassPathResource("Common_Foods.json"); //loads files in resources
        InputStream inputStream = res.getInputStream(); //data's reading-flow
        List<Food> foods = mapper.readValue(inputStream, new TypeReference<List<Food>>() {
        });//TtpeReference-> to denot in which type json will be convertied
        if (fr.count() == 0) {
            fr.saveAll(foods);//to save only once
            System.out.println("Foods imported!");
        }


    }

}
