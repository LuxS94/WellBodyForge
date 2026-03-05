package org.example.be.dto;

import jakarta.validation.constraints.*;
import org.example.be.enums.Lifestyle;
import org.example.be.enums.Plan;
import org.example.be.enums.Sex;

public record UserDTO(@NotBlank(message = "Username field cannot be empty!") String username,
                      @NotBlank(message = "Email field cannot be empty!") @Email String email,
                      @NotBlank(message = "Password field cannot be empty!") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "The password must contain at least one uppercase letter, one number, one special character, and must be at least 8 characters long!") String password,
                      @NotNull(message = "Height field cannot be empty!") @Positive(message = "Height must be positive") Double height,
                      @NotNull(message = "Weight field cannot be empty!") @Positive(message = "Weight must be positive") Double weight,
                      @NotNull(message = "Age field cannot be empty!") @Min(value = 1, message = "Age must be greater than 0") @Max(value = 120, message = "Age must be realistic") Integer age,
                      @NotNull(message = "Sex field cannot be empty!") Sex sex,
                      @NotNull(message = "Lifestyle field cannot be empty!") Lifestyle lifestyle,
                      @NotNull(message = "Plan field cannot be empty!") Plan plan) {
}
