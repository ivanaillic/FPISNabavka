package com.projekat.fpis_backend.controller;

import com.projekat.fpis_backend.exception.ResourceNotFoundException;
import com.projekat.fpis_backend.model.Dobavljac;
import com.projekat.fpis_backend.service.DobavljacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class DobavljacController {

    private final DobavljacService dobavljacService;

    @Autowired
    public DobavljacController(DobavljacService dobavljacService) {
        this.dobavljacService = dobavljacService;
    }

    @PostMapping("/api/dobavljac")
    Dobavljac newDobavljac(@RequestBody Dobavljac newDobavljac){
        return dobavljacService.createDobavljac(newDobavljac);
    }

    @GetMapping("/api/dobavljaci")
    List<Dobavljac> getAllDobavljaci(){
        return dobavljacService.findAll();
    }

    @GetMapping("/api/dobavljac/{pib}")
    Dobavljac getDobavljacById(@PathVariable Long pib){
        return dobavljacService.findById(pib)
                .orElseThrow(() -> new ResourceNotFoundException("Dobavljac sa PIB " + pib + " nije nadjen"));
    }

    @PutMapping("/api/dobavljac/{pib}")
    Dobavljac updateDobavljac(@RequestBody Dobavljac newDobavljac, @PathVariable Long pib){
        Dobavljac dobavljac = dobavljacService.findById(pib)
                .orElseThrow(() -> new ResourceNotFoundException("Dobavljac sa PIB " + pib + " nije nadjen"));

        dobavljac.setNazivDobavljaca(newDobavljac.getNazivDobavljaca());
        dobavljac.setTelefon(newDobavljac.getTelefon());
        dobavljac.setEmailDobavljaca(newDobavljac.getEmailDobavljaca());
        dobavljac.setTekuciRacun(newDobavljac.getTekuciRacun());
        dobavljac.setGrad(newDobavljac.getGrad());

        return dobavljacService.updateDobavljac(dobavljac);
    }

    @DeleteMapping("/api/dobavljac/{pib}")
    String deleteDobavljac(@PathVariable Long pib){
        if (!dobavljacService.findById(pib).isPresent()) {
            throw new ResourceNotFoundException("Dobavljac sa PIB " + pib + " nije nadjen");
        }
        dobavljacService.deleteDobavljac(pib);
        return "Dobavljac sa PIB " + pib + " je uspesno obrisan";
    }
}
