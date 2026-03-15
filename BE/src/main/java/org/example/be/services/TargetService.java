package org.example.be.services;

import org.example.be.dto.TargetDTO;
import org.example.be.entities.Target;
import org.example.be.entities.User;
import org.example.be.entities.UserSecurity;
import org.example.be.enums.Lifestyle;
import org.example.be.enums.Plan;
import org.example.be.enums.Sex;
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
        return calculate(u);
    }

    public Target adReturnDefaultValue(String id) {
        User u = this.ur.findByTarget_Id(id).orElseThrow(() -> new NotFoundException("User not found"));
        Target updatedTarget = calculate(u);
        return updatedTarget;
    }

    public Target calculate(User user) {
        double BMR = 0; //basal metabolic rate
        double TDEE = 0;//lifestyle factor
        double FFP = 0;//factor for plan
        double proteinForKg = 0;
        double fatForKg = 0;
        if (user.getSex() == Sex.M) {
            BMR = 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * user.getAge() + 5;
        } else {
            BMR = 10 * user.getWeight() + 6.25 * user.getHeight() - 5 * user.getAge() - 161;
        }
        ;
        if (user.getLifestyle() == Lifestyle.SEDENTARY) {
            TDEE = 1.2;
        }
        ;
        if (user.getLifestyle() == Lifestyle.MODERATELY_ACTIVE) {
            TDEE = 1.55;
        }
        ;
        if (user.getLifestyle() == Lifestyle.ATHLETIC) {
            TDEE = 1.75;
        }
        ;
        if (user.getPlan() == Plan.WEIGHT_LOSS) {
            FFP = 0.82;
        }
        ;
        if (user.getPlan() == Plan.MAINTENANCE) {
            FFP = 1.0;
        }
        ;
        if (user.getPlan() == Plan.BULK) {
            FFP = 1.15;
        }
        ;
        if (user.getPlan() == Plan.WEIGHT_LOSS) {
            proteinForKg = 2.2;
            fatForKg = 1.0;
        }
        ;
        if (user.getPlan() == Plan.MAINTENANCE) {
            proteinForKg = 2.0;
            fatForKg = 0.9;
        }
        ;
        if (user.getPlan() == Plan.BULK) {
            proteinForKg = 1.8;
            fatForKg = 1.0;
        }
        Target f = this.tr.findByUser(user).orElse(new Target(user));
        f.setKcal(Math.round(((BMR * TDEE) * FFP) * 100.0) / 100.0);
        f.setProtein(Math.round((proteinForKg * user.getWeight()) * 100.0) / 100.0);
        f.setFat(Math.round((fatForKg * user.getWeight()) * 100.0) / 100.0);
        f.setCarbs(Math.round(((f.getKcal() - (f.getProtein() * 4 + f.getFat() * 9)) / 4) * 100.0) / 100.0);
        return this.tr.save(f);
    }
}
