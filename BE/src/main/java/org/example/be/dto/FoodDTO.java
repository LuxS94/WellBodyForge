package org.example.be.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.example.be.enums.Type;

public record FoodDTO(@NotBlank(message = "Type field cannot be empty!") Type type,
                      @NotBlank(message = "Name field cannot be empty!") String name,
                      @NotNull(message = "Calories field cannot be empty!") @Positive(message = "Calories must be positive") Double kcal,
                      @NotNull(message = "Protein field cannot be empty!") @Positive(message = "Protein must be positive") Double protein,
                      @NotNull(message = "Carbs field cannot be empty!") @Positive(message = "Carbs must be positive") Double carbs,
                      @NotNull(message = "Fat field cannot be empty!") @Positive(message = "Fat must be positive") Double fat) {
}
