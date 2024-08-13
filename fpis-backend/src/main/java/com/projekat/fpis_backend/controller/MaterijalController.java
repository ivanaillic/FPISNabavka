package com.projekat.fpis_backend.controller;

import com.projekat.fpis_backend.exception.ResourceNotFoundException;
import com.projekat.fpis_backend.model.Materijal;
import com.projekat.fpis_backend.repository.MaterijalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5174")
public class MaterijalController {

    @Autowired
    private MaterijalRepository materijalRepository;


    @GetMapping("/api/materijali")
    public List<Materijal> getAllMaterijali() {
        return materijalRepository.findAll();
    }

    @GetMapping("/api/materijal/{sifra}")
    public Materijal getMaterijalById(@PathVariable Long sifra) {
        return materijalRepository.findById(sifra)
                .orElseThrow(() -> new ResourceNotFoundException("Materijal sa ID " + sifra + " nije nadjen"));
    }

}
