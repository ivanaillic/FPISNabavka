package com.projekat.fpis_backend.controller;

import com.projekat.fpis_backend.model.Narudzbenica;
import com.projekat.fpis_backend.service.NarudzbenicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/narudzbenice")
public class NarudzbenicaController {

    @Autowired
    private NarudzbenicaService narudzbenicaService;

    @GetMapping
    public List<Narudzbenica> getAllNarudzbenice() {
        return narudzbenicaService.getAllNarudzbenice();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Narudzbenica> getNarudzbenicaById(@PathVariable Long id) {
        Optional<Narudzbenica> narudzbenica = narudzbenicaService.getNarudzbenicaById(id);
        return narudzbenica.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Narudzbenica> createNarudzbenica(@RequestBody Narudzbenica narudzbenica) {
        Narudzbenica createdNarudzbenica = narudzbenicaService.createNarudzbenica(narudzbenica);
        return new ResponseEntity<>(createdNarudzbenica, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Narudzbenica> updateNarudzbenica(@PathVariable Long id, @RequestBody Narudzbenica narudzbenica) {
        Narudzbenica updatedNarudzbenica = narudzbenicaService.updateNarudzbenica(id, narudzbenica);
        return updatedNarudzbenica != null ? ResponseEntity.ok(updatedNarudzbenica) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNarudzbenica(@PathVariable Long id) {
        narudzbenicaService.deleteNarudzbenica(id);
        return ResponseEntity.noContent().build();
    }
}
