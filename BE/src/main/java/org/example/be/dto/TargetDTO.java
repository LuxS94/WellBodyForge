package org.example.be.dto;

import jakarta.validation.constraints.NotBlank;

public record TargetDTO(@NotBlank(message = "User id field cannot be empty!") String userid, Double kcal,
                        Double protein, Double carbs, Double fat) {
}
