package com.projekat.fpis_backend.controller;

import com.projekat.fpis_backend.model.StavkaNarudzbenice;
import com.projekat.fpis_backend.model.StavkaNarudzbeniceCompositeKey;
import com.projekat.fpis_backend.service.StavkaNarudzbeniceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stavke-narudzbenice")
@CrossOrigin("http://localhost:5174")
public class StavkaNarudzbeniceController {

    @Autowired
    private StavkaNarudzbeniceService stavkaNarudzbeniceService;

    @GetMapping
    public List<StavkaNarudzbenice> getAllStavkeNarudzbenice() {
        return stavkaNarudzbeniceService.getAllStavkeNarudzbenice();
    }

    @GetMapping("/{brojNarudzbenice}/{redniBrojStavke}")
    public ResponseEntity<StavkaNarudzbenice> getStavkaNarudzbeniceById(@PathVariable Long brojNarudzbenice,
                                                                        @PathVariable Integer redniBrojStavke) {
        StavkaNarudzbeniceCompositeKey id = new StavkaNarudzbeniceCompositeKey(brojNarudzbenice, redniBrojStavke);
        Optional<StavkaNarudzbenice> stavkaNarudzbenice = stavkaNarudzbeniceService.getStavkaNarudzbeniceById(id);
        return stavkaNarudzbenice.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StavkaNarudzbenice> createStavkaNarudzbenice(@RequestBody StavkaNarudzbenice stavkaNarudzbenice) {
        StavkaNarudzbenice createdStavkaNarudzbenice = stavkaNarudzbeniceService.createStavkaNarudzbenice(stavkaNarudzbenice);
        return new ResponseEntity<>(createdStavkaNarudzbenice, HttpStatus.CREATED);
    }

    @PutMapping("/{brojNarudzbenice}/{redniBrojStavke}")
    public ResponseEntity<StavkaNarudzbenice> updateStavkaNarudzbenice(@PathVariable Long brojNarudzbenice,
                                                                       @PathVariable Integer redniBrojStavke,
                                                                       @RequestBody StavkaNarudzbenice stavkaNarudzbenice) {
        StavkaNarudzbeniceCompositeKey id = new StavkaNarudzbeniceCompositeKey(brojNarudzbenice, redniBrojStavke);
        StavkaNarudzbenice updatedStavkaNarudzbenice = stavkaNarudzbeniceService.updateStavkaNarudzbenice(id, stavkaNarudzbenice);
        return updatedStavkaNarudzbenice != null ? ResponseEntity.ok(updatedStavkaNarudzbenice) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{brojNarudzbenice}/{redniBrojStavke}")
    public ResponseEntity<Void> deleteStavkaNarudzbenice(@PathVariable Long brojNarudzbenice,
                                                         @PathVariable Integer redniBrojStavke) {
        StavkaNarudzbeniceCompositeKey id = new StavkaNarudzbeniceCompositeKey(brojNarudzbenice, redniBrojStavke);
        stavkaNarudzbeniceService.deleteStavkaNarudzbenice(id);
        return ResponseEntity.noContent().build();
    }
}
