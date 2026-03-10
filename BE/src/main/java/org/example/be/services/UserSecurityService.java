package org.example.be.services;

import org.example.be.entities.Admin;
import org.example.be.entities.User;
import org.example.be.entities.UserSecurity;
import org.example.be.enums.Role;
import org.example.be.exceptions.NotFoundException;
import org.example.be.repositories.AdminRepo;
import org.example.be.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//Service to authenticate user or admin
@Service
public class UserSecurityService implements UserDetailsService {
    private final UserRepo ur;
    private final AdminRepo ar;

    @Autowired
    public UserSecurityService(UserRepo ur, AdminRepo ar) {
        this.ar = ar;
        this.ur = ur;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (ar.findByUsername(username).isPresent()) {
            Admin ad = ar.findByUsername(username).get();
            return new UserSecurity(ad.getId(), ad.getUsername(), ad.getPassword(), Role.ADMIN);
        } else if (ur.findByUsername(username).isPresent()) {
            User us = ur.findByUsername(username).get();
            return new UserSecurity(us.getId(), us.getUsername(), us.getPassword(), Role.USER);
        }
        throw new NotFoundException("");
    }

    public UserSecurity findUserSecurityById(String id) {
        if (this.ar.findById(id).isPresent()) {
            Admin ad = ar.findById(id).get();
            return new UserSecurity(ad.getId(), ad.getUsername(), ad.getPassword(), Role.ADMIN);
        } else if (this.ur.findById(id).isPresent()) {
            User us = ur.findById(id).get();
            return new UserSecurity(us.getId(), us.getUsername(), us.getPassword(), Role.USER);
        }
        throw new NotFoundException("");
    }

    public UserSecurity findUserSecurityByUsername(String username) {
        if (ar.findByUsername(username).isPresent()) {
            Admin ad = ar.findByUsername(username).get();
            return new UserSecurity(ad.getId(), ad.getUsername(), ad.getPassword(), Role.ADMIN);
        } else if (ur.findByUsername(username).isPresent()) {
            User us = ur.findByUsername(username).get();
            return new UserSecurity(us.getId(), us.getUsername(), us.getPassword(), Role.USER);
        }
        throw new NotFoundException("");
    }
}

