package org.example.be.services;

import org.example.be.dto.TargetDTO;
import org.example.be.entities.Target;
import org.example.be.entities.User;
import org.example.be.entities.UserSecurity;
import org.example.be.exceptions.NotFoundException;
import org.example.be.repositories.TargetRepo;
import org.example.be.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TargetService {
    private final TargetRepo tr;
    private final UserRepo ur;

    @Autowired
    public TargetService(TargetRepo tr, UserRepo ur) {
        this.tr = tr;
        this.ur = ur;
    }

    //admin
    public Target findById(String id) {
        return this.tr.findById(id).orElseThrow(() -> new NotFoundException("Target not found"));
    }

    public Page<Target> findAll(int page, int size, String orderBy, String sortCriteria) {
        if (size > 100 || size < 0) size = 10;
        if (page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, size,
                sortCriteria.equals("desc") ? Sort.by(orderBy).descending() : Sort.by(orderBy));
        return this.tr.findAll(pageable);
    }

    public Target update(String id, TargetDTO body) {
        Target f = this.tr.findById(id).orElseThrow(() -> new NotFoundException("Target not found"));
        if (body.kcal() != null) {
            f.setKcal(body.kcal());
        }
        if (body.protein() != null) {
            f.setProtein(body.protein());
        }
        if (body.carbs() != null) {
            f.setCarbs(body.carbs());
        }
        if (body.fat() != null) {
            f.setFat(body.fat());
        }

        return this.tr.save(f);
    }

//    public Target updateUser(String targetid, TargetUserDTO body) {
//        User f = this.ur.findById(body.userid()).orElseThrow(() -> new NotFoundException("User not found"));
//        Target t = this.tr.findById(targetid).orElseThrow(() -> new NotFoundException("Target not found"));
//        t.setUser(f);
//        return this.tr.save(t);
//
//    }

    //user
    public Target showMyTarget(UserSecurity user) {
        User u = this.ur.findById(user.getId()).orElseThrow(() -> new NotFoundException("User not found"));
        Target f = this.tr.findByUser(u).orElseThrow(() -> new NotFoundException("Target not found"));
        return f;
    }

    public Target updateMyTarget(UserSecurity user, TargetDTO body) {
        User u = this.ur.findById(user.getId()).orElseThrow(() -> new NotFoundException("User not found"));
        Target f = this.tr.findByUser(u).orElseThrow(() -> new NotFoundException("Target not found"));
        if (body.kcal() != null) {
            f.setKcal(body.kcal());
        }
        if (body.protein() != null) {
            f.setProtein(body.protein());
        }
        if (body.carbs() != null) {
            f.setCarbs(body.carbs());
        }
        if (body.fat() != null) {
            f.setFat(body.fat());
        }
        return this.tr.save(f);
    }

    public Target returnDefaultValue(UserSecurity user) {
        User u = this.ur.findById(user.getId()).orElseThrow(() -> new NotFoundException("User not found"));
        Target f = this.tr.findByUser(u).orElseThrow(() -> new NotFoundException("Target not found"));
        f.calculate();
        return this.tr.save(f);
    }

    public Target adReturnDefaultValue(String id) {
        Target f = this.tr.findById(id).orElseThrow(() -> new NotFoundException("Target not found"));
        f.calculate();
        return this.tr.save(f);
    }
}
