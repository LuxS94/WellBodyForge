package org.example.be.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record AdminDTO(@NotBlank(message = "Username field cannot be empty!") String username,
                       @NotBlank(message = "Email field cannot be empty!") @Email String email,
                       @NotBlank(message = "Password field cannot be empty!") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "The password must contain at least one uppercase letter, one number, one special character, and must be at least 8 characters long!") String password) {
}
