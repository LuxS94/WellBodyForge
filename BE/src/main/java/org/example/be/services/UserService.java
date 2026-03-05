package org.example.be.services;

import org.example.be.dto.UserDTO;
import org.example.be.entities.Target;
import org.example.be.entities.User;
import org.example.be.exceptions.AlreadyExists;
import org.example.be.repositories.AdminRepo;
import org.example.be.repositories.TargetRepo;
import org.example.be.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepo ur;
    private final TargetRepo tr;
    private final AdminRepo ar;

    @Autowired
    public UserService(UserRepo ur, TargetRepo tr, AdminRepo ar) {
        this.ur = ur;
        this.tr = tr;
        this.ar = ar;
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

    public void delete(User user) {
        this.ur.delete(user);
    }
}
