package org.example.be.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import org.example.be.enums.Lifestyle;
import org.example.be.enums.Plan;
import org.example.be.enums.Sex;

public record UserADTO(@NotBlank(message = "Username field cannot be empty!") String username,
                       @NotBlank(message = "Email field cannot be empty!") @Email String email,
                       @Nullable String password,
                       @NotNull(message = "Height field cannot be empty!") @Positive(message = "Height must be positive") Integer height,
                       @NotNull(message = "Weight field cannot be empty!") @Positive(message = "Weight must be positive") @Max(value = 500, message = "Weight must be realistic") Double weight,
                       @NotNull(message = "Age field cannot be empty!") @Min(value = 1, message = "Age must be greater than 0") @Max(value = 120, message = "Age must be realistic") Integer age,
                       @NotNull(message = "Sex field cannot be empty!") Sex sex,
                       @NotNull(message = "Lifestyle field cannot be empty!") Lifestyle lifestyle,
                       @NotNull(message = "Plan field cannot be empty!") Plan plan) {
}
