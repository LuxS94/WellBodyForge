package org.example.be.services;

import org.example.be.dto.TargetDTO;
import org.example.be.entities.Target;
import org.example.be.exceptions.NotFoundException;
import org.example.be.repositories.TargetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TargetService {
    private final TargetRepo tr;

    @Autowired
    public TargetService(TargetRepo tr) {
        this.tr = tr;
    }

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

    //only admin
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
}
