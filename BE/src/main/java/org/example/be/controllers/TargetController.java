package org.example.be.controllers;

import org.example.be.dto.TargetDTO;
import org.example.be.dto.TargetUserDTO;
import org.example.be.entities.Target;
import org.example.be.entities.User;
import org.example.be.services.TargetService;
import org.example.be.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    }//http:/localhost:3001/target/show/{id}

    @GetMapping("/showAll")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<Target> showAll(@RequestParam int page, @RequestParam int size, @RequestParam String orderBy, @RequestParam String sortCriteria) {
        return this.ts.findAll(page, size, orderBy, sortCriteria);
    }//http:/localhost:3001/target/showAll

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Target update(@PathVariable String id, @RequestBody TargetDTO body) {
        return this.ts.update(id, body);
    } //http:/localhost:3001/target/update/{id}

    @PatchMapping("/updateUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Target updateUser(@PathVariable String id, @RequestBody TargetUserDTO body) {
        return this.ts.updateUser(id, body);
    }//http:/localhost:3001/target/updateUser/{id}

    @GetMapping("/myTarget")
    public Target showMyTarget(@AuthenticationPrincipal User currentUser) {
        return this.ts.showMyTarget(currentUser);
    }//http:/localhost:3001/target/myTarget

    @PutMapping("/updateMyTarget")
    public Target updateMyTarget(@AuthenticationPrincipal User currentUser, @RequestBody TargetDTO body) {
        return this.ts.updateMyTarget(currentUser, body);
    }//http:/localhost:3001/target/updateMyTarget
}
