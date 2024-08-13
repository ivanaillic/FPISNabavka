package com.projekat.fpis_backend.controller;

import com.projekat.fpis_backend.exception.ResourceNotFoundException;
import com.projekat.fpis_backend.model.Zaposleni;
import com.projekat.fpis_backend.repository.ZaposleniRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5174")
public class ZaposleniController {

    @Autowired
    private ZaposleniRepository zaposleniRepository;

    @GetMapping("/api/zaposleni")
    public List<Zaposleni> getAllZaposleni() {
        return zaposleniRepository.findAll();
    }

    @GetMapping("/api/zaposleni/{jmbg}")
    public Zaposleni getZaposleniById(@PathVariable String jmbg) {
        return zaposleniRepository.findById(jmbg)
                .orElseThrow(() -> new ResourceNotFoundException("Zaposleni sa JMBG " + jmbg + " nije nadjen"));
    }
}
