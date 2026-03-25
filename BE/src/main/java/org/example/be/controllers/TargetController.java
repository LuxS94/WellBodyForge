package org.example.be.controllers;

import org.example.be.dto.TargetDTO;
import org.example.be.entities.Target;
import org.example.be.entities.UserSecurity;
import org.example.be.services.TargetService;
import org.example.be.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/target")
public class TargetController {
    private final TargetService ts;
    private final UserService us;

    public TargetController(TargetService ts, UserService us) {
        this.ts = ts;
        this.us = us;
    }

    @GetMapping("/show/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Target showTarget(@PathVariable String id) {
        return this.ts.findById(id);
    }//http://localhost:3001/target/show/{id}

    @GetMapping("/showAll")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<Target> showAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "1000") int size, @RequestParam(defaultValue = "kcal") String orderBy, @RequestParam(defaultValue = "asc") String sortCriteria) {
        return this.ts.findAll(page, size, orderBy, sortCriteria);
    }//http://localhost:3001/target/showAll

    @GetMapping("/myTarget")
    public Target showMyTarget(@AuthenticationPrincipal UserSecurity currentUser) {
        return this.ts.showMyTarget(currentUser);
    }//http://localhost:3001/target/myTarget

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Target update(@PathVariable String id, @RequestBody @Validated TargetDTO body) {
        return this.ts.update(id, body);
    } //http://localhost:3001/target/update/{id}


    @PutMapping("/updateMyTarget")
    public Target updateMyTarget(@AuthenticationPrincipal UserSecurity currentUser, @RequestBody @Validated TargetDTO body) {
        return this.ts.updateMyTarget(currentUser, body);
    }//http://localhost:3001/target/updateMyTarget

    @PutMapping("/turnDefault")
    public Target returnDefault(@AuthenticationPrincipal UserSecurity user) {
        return this.ts.returnDefaultValue(user);
    }//http://localhost:3001/target/turnDefault

    @PutMapping("/default/{id}")
    public Target adReturnDefault(@PathVariable String id) {
        return this.ts.adReturnDefaultValue(id);
    }//http://localhost:3001/target/default/{id}
}
