package com.projekat.fpis_backend.controller;

import com.projekat.fpis_backend.exception.ResourceNotFoundException;
import com.projekat.fpis_backend.model.Zaposleni;
import com.projekat.fpis_backend.service.ZaposleniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class ZaposleniController {

    private final ZaposleniService zaposleniService;

    @Autowired
    public ZaposleniController(ZaposleniService zaposleniService) {
        this.zaposleniService = zaposleniService;
    }

    @GetMapping("/api/zaposleni")
    public List<Zaposleni> getAllZaposleni() {
        return zaposleniService.findAll();
    }

    @GetMapping("/api/zaposleni/{jmbg}")
    public Zaposleni getZaposleniById(@PathVariable String jmbg) {
        return zaposleniService.findById(jmbg)
                .orElseThrow(() -> new ResourceNotFoundException("Zaposleni sa JMBG " + jmbg + " nije nadjen"));
    }
}
