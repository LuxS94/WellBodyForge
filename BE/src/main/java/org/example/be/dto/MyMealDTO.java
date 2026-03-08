package org.example.be.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record MyMealDTO(@NotBlank(message = "Description field cannot be empty!") String description,
                        @NotNull(message = "Date field cannot be empty!") LocalDate date) {
}
