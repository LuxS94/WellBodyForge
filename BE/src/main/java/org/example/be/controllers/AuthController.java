package org.example.be.controllers;

import org.example.be.dto.LoginDTO;
import org.example.be.dto.LoginResDTO;
import org.example.be.dto.UserDTO;
import org.example.be.entities.User;
import org.example.be.exceptions.ValidationException;
import org.example.be.services.AuthService;
import org.example.be.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService as;
    private final UserService us;

    public AuthController(AuthService as, UserService us) {
        this.as = as;
        this.us = us;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody @Validated UserDTO payload, BindingResult validationResults) {
        if (validationResults.hasErrors()) {

            List<String> errorsList = validationResults.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList();

            throw new ValidationException(errorsList);
        } else {
            return this.us.create(payload);
        }
    }

    @PostMapping("/login")
    public LoginResDTO login(@RequestBody @Validated LoginDTO body) {

        return new LoginResDTO(this.as.checkCredentialsAndGenerateToken(body));
    }//http://localhost:3001/auth/login
}
