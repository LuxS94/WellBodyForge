package org.example.be.controllers;

import org.example.be.dto.UserDTO;
import org.example.be.entities.User;
import org.example.be.entities.UserSecurity;
import org.example.be.exceptions.ValidationException;
import org.example.be.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService us;
    private final PasswordEncoder pw;


    public UserController(UserService us, PasswordEncoder pw) {
        this.us = us;
        this.pw = pw;
    }

    @GetMapping("/myProfile")
    public User showMyProfile(@AuthenticationPrincipal UserSecurity currentUser) {
        return this.us.findById(currentUser.getId());
    }//http://localhost:3001/user/myProfile

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<User> showsAllUsers(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size,
                                    @RequestParam(defaultValue = "date") String orderBy,
                                    @RequestParam(defaultValue = "asc") String sortCriteria) {
        return this.us.findAllUsers(page, size, orderBy, sortCriteria);
    }//http://localhost:3001/user/all

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(UserDTO body, BindingResult validationResults) {
        if (validationResults.hasErrors()) {

            List<String> errorsList = validationResults.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList();

            throw new ValidationException(errorsList);
        } else {
            return this.us.create(body);
        }
    }

    @PutMapping("/updateMe")
    public User updateMyProfile(@AuthenticationPrincipal UserSecurity currentUser, @RequestBody UserDTO body) {
        return this.us.update(currentUser, body);
    }//http://localhost:3001/user/updateMe

    @PutMapping("/{id}/update")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateProfile(@PathVariable String id, @RequestBody UserDTO body) {
        return this.us.adUpdate(id, body);
    }//http://localhost:3001/user/{id}/update

    @DeleteMapping("/deleteMe")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMyProfile(@AuthenticationPrincipal UserSecurity currentUser) {
        this.us.delete(currentUser);
    }//http://localhost:3001/user/deteleMe

    @DeleteMapping("/{id}/delete")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProfile(@PathVariable String id) {
        this.us.adDelete(id);
    }//http://localhost:3001/{id}/detele
}
