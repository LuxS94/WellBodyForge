package org.example.be.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MealFoodDTO(@NotBlank(message = "Meal field cannot be empty!") String mealId,
                          @NotBlank(message = "Food field cannot be empty!") String foodId,
                          @NotNull(message = "Grams field cannot be empty!") double grams) {
}
