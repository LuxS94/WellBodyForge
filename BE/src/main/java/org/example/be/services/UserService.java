package org.example.be.services;

import org.example.be.dto.UserDTO;
import org.example.be.entities.Target;
import org.example.be.entities.User;
import org.example.be.exceptions.AlreadyExists;
import org.example.be.exceptions.NotFoundException;
import org.example.be.repositories.AdminRepo;
import org.example.be.repositories.TargetRepo;
import org.example.be.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepo ur;
    private final TargetRepo tr;
    private final AdminRepo ar;
    private final PasswordEncoder pw;

    @Autowired
    public UserService(UserRepo ur, TargetRepo tr, AdminRepo ar, PasswordEncoder pw) {
        this.ur = ur;
        this.tr = tr;
        this.ar = ar;
        this.pw = pw;
    }

    //email and username are unique for admin and users
    public User create(UserDTO body) {
        if (this.ur.findByUsername(body.username()).isPresent() || this.ar.findByUsername(body.username()).isPresent()) {
            throw new AlreadyExists("Username already in use.Please choose another one");
        }
        if (this.ur.findByEmail(body.email()).isPresent() || this.ar.findByEmail(body.email()).isPresent()) {
            throw new AlreadyExists("Email already in use.Please choose another one");
        }
        User nUser = new User(body.username(), body.email(), body.password(), body.height(), body.weight(), body.age(), body.sex(), body.lifestyle(), body.plan());
        this.ur.save(nUser);
        Target nTarget = new Target(nUser);
        this.tr.save(nTarget);
        return nUser;
    }

    public User update(User user, UserDTO body) {
        if (body.username() != user.getUsername()) {
            if (
                    this.ur.findByUsername(body.username()).isPresent() || this.ar.findByUsername(body.username()).isPresent()) {
                throw new AlreadyExists("Username already in use.Please choose another one");
            }
        }
        ;
        user.setUsername(body.username());
        if (body.email() != user.getEmail()) {
            if (
                    this.ur.findByEmail(body.email()).isPresent() || this.ar.findByEmail(body.email()).isPresent()) {
                throw new AlreadyExists("Email already in use.Please choose another one");
            }
        }
        ;
        user.setEmail(body.email());
        user.setPassword(body.password());
        user.setHeight(body.height());
        user.setWeight(body.weight());
        user.setAge(body.age());
        user.setSex(body.sex());
        user.setLifestyle(body.lifestyle());
        user.setPlan(body.plan());
        this.ur.save(user);
        Target t = this.tr.findByUser(user).get();
        this.tr.save(t);
        return user;
    }

    public User findById(String id) {
        return this.ur.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
    }

    public Page<User> findAllUsers(int page, int size, String orderBy, String sortCriteria) {
        if (size > 100 || size < 0) size = 10;
        if (page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, size,
                sortCriteria.equals("desc") ? Sort.by(orderBy).descending() : Sort.by(orderBy));
        return this.ur.findAll(pageable);
    }

    public void delete(User user) {
        this.ur.delete(user);
    }
}
