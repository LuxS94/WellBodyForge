package org.example.be.controllers;

import org.example.be.dto.AdminDTO;
import org.example.be.entities.Admin;
import org.example.be.entities.UserSecurity;
import org.example.be.exceptions.ValidationException;
import org.example.be.services.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService as;


    public AdminController(AdminService as) {
        this.as = as;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<Admin> findALl(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "1000") int size,
                               @RequestParam(defaultValue = "username") String orderBy,
                               @RequestParam(defaultValue = "asc") String sortCriteria) {
        return this.as.findALl(page, size, orderBy, sortCriteria);
    }//http://localhost:3001/admin/all

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Admin find(@PathVariable String id) {
        return this.as.find(id);
    }//http://localhost:3001/admin/{id}

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Admin create(@RequestBody @Validated AdminDTO body, BindingResult validationResults) {
        if (validationResults.hasErrors()) {

            List<String> errorsList = validationResults.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList();

            throw new ValidationException(errorsList);
        } else {
            return this.as.create(body);
        }
    }//http://localhost:3001/admin

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Admin updateMe(@AuthenticationPrincipal UserSecurity u, @RequestBody @Validated AdminDTO body) {
        return this.as.updateMe(u, body);
    }//http://localhost:3001/admin

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMe(@AuthenticationPrincipal UserSecurity u) {
        this.as.deleteMe(u);
    }//http://localhost:3001/admin
}
