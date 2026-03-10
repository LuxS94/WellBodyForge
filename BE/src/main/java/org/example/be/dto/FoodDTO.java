package org.example.be.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.example.be.enums.Type;

public record FoodDTO(@NotNull(message = "Type field cannot be empty!") Type type,
                      @NotBlank(message = "Name field cannot be empty!") String name,
                      @NotNull(message = "Calories field cannot be empty!") @Min(value = 0) Double kcal,
                      @NotNull(message = "Protein field cannot be empty!") @Min(value = 0) Double protein,
                      @NotNull(message = "Carbs field cannot be empty!") @Min(value = 0) Double carbs,
                      @NotNull(message = "Fat field cannot be empty!") @Min(value = 0) Double fat) {
}
