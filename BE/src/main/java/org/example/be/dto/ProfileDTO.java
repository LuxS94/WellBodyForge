package org.example.be.dto;

import org.example.be.enums.Role;

public record ProfileDTO(String id, String username, Role role) {
}
