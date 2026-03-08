package org.example.be.controllers;

import org.example.be.dto.UserDTO;
import org.example.be.entities.User;
import org.example.be.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    public User showMyProfile(@AuthenticationPrincipal User currentUser) {
        return this.us.findById(currentUser.getId());
    }//http://localhost:3001/user/myProfile

    @PutMapping("/updateMe")
    public User updateMyProfile(@AuthenticationPrincipal User currentUser, @RequestBody UserDTO body) {
        User f = this.us.findById(currentUser.getId());
        return this.us.update(f, body);
    }//http://localhost:3001/user/updateMe

    @PutMapping("/{id}/update")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateProfile(@PathVariable String id, @RequestBody UserDTO body) {
        return this.us.adUpdate(id, body);
    }//http://localhost:3001/user/{id}/update

    @DeleteMapping("/deleteMe")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMyProfile(@AuthenticationPrincipal User currentUser) {
        this.us.delete(currentUser);
    }//http://localhost:3001/user/deteleMe

    @DeleteMapping("/{id}/delete")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProfile(@PathVariable String id) {
        this.us.adDelete(id);
    }//http://localhost:3001/{id}/detele
}
