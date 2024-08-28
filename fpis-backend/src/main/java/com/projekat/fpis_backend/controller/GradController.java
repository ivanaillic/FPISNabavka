package com.projekat.fpis_backend.controller;

import com.projekat.fpis_backend.exception.ResourceNotFoundException;
import com.projekat.fpis_backend.model.Grad;
import com.projekat.fpis_backend.service.GradService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class GradController {

    private final GradService gradService;

    @Autowired
    public GradController(GradService gradService) {
        this.gradService = gradService;
    }

    @GetMapping("/api/gradovi")
    public List<Grad> getAllGradovi() {
        return gradService.findAll();
    }

    @GetMapping("/api/grad/{ptt}")
    public Grad getGradById(@PathVariable Long ptt) {
        return gradService.findById(ptt)
                .orElseThrow(() -> new ResourceNotFoundException("Grad sa PTT " + ptt + " nije nadjen"));
    }
}
