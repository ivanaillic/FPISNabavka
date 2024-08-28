package com.projekat.fpis_backend.controller;

import com.projekat.fpis_backend.exception.ResourceNotFoundException;
import com.projekat.fpis_backend.model.Materijal;
import com.projekat.fpis_backend.service.MaterijalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class MaterijalController {

    private final MaterijalService materijalService;

    @Autowired
    public MaterijalController(MaterijalService materijalService) {
        this.materijalService = materijalService;
    }

    @GetMapping("/api/materijali")
    public List<Materijal> getAllMaterijali() {
        return materijalService.findAll();
    }

    @GetMapping("/api/materijal/{sifra}")
    public Materijal getMaterijalById(@PathVariable Long sifra) {
        return materijalService.findById(sifra)
                .orElseThrow(() -> new ResourceNotFoundException("Materijal sa ID " + sifra + " nije nadjen"));
    }
}
