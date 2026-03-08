package org.example.be.dto;

import jakarta.validation.constraints.NotBlank;

public record TargetUserDTO(@NotBlank(message = "User id field cannot be empty!") String userid) {
}
