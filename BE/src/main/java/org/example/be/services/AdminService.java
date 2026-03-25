package org.example.be.services;

import org.example.be.dto.AdminDTO;
import org.example.be.entities.Admin;
import org.example.be.entities.UserSecurity;
import org.example.be.exceptions.AlreadyExists;
import org.example.be.exceptions.NotFoundException;
import org.example.be.repositories.AdminRepo;
import org.example.be.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private final AdminRepo ar;
    private final PasswordEncoder pw;
    private final UserRepo ur;

    @Autowired
    public AdminService(AdminRepo ar, PasswordEncoder pw, UserRepo ur) {
        this.ar = ar;
        this.pw = pw;
        this.ur = ur;
    }

    public Page<Admin> findALl(int page, int size, String orderBy, String sortCriteria) {
        if (page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, size,
                sortCriteria.equals("desc") ? Sort.by(orderBy).descending() : Sort.by(orderBy));
        return this.ar.findAll(pageable);
    }

    public Admin find(String id) {
        return this.ar.findById(id).orElseThrow(() -> new NotFoundException("Admin not found"));
    }

    public Admin create(AdminDTO body) {
        if (this.ar.findByUsername(body.username()).isPresent() || this.ur.findByUsername(body.username()).isPresent()) {
            throw new AlreadyExists("Username already in use.Please choose another one");
        }
        if (this.ar.findByEmail(body.email()).isPresent() || this.ur.findByEmail(body.email()).isPresent()) {
            throw new AlreadyExists("Email already in use.Please choose another one");
        }
        Admin nAdmin = new Admin(body.username(), body.email(), pw.encode(body.password()));
        return this.ar.save(nAdmin);
    }

    public Admin updateMe(UserSecurity u, AdminDTO body) {
        Admin a = this.ar.findById(u.getId()).orElseThrow(() -> new NotFoundException("Admin not found"));
        if (!body.username().equals(a.getUsername())) {
            if (
                    this.ur.findByUsername(body.username()).isPresent() || this.ar.findByUsername(body.username()).isPresent()) {
                throw new AlreadyExists("Username already in use.Please choose another one");
            }
        }
        ;
        a.setUsername(body.username());
        if (!body.email().equals(a.getEmail())) {
            if (
                    this.ur.findByEmail(body.email()).isPresent() || this.ar.findByEmail(body.email()).isPresent()) {
                throw new AlreadyExists("Email already in use.Please choose another one");
            }
        }
        a.setEmail(body.email());
        a.setPassword(pw.encode(body.password()));
        return this.ar.save(a);
    }

    ;

    public void deleteMe(UserSecurity u) {
        Admin a = this.ar.findById(u.getId()).orElseThrow(() -> new NotFoundException("Admin not found"));
        this.ar.delete(a);

    }

    ;

}
