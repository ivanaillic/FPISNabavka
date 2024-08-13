package com.projekat.fpis_backend.controller;

import com.projekat.fpis_backend.exception.ResourceNotFoundException;
import com.projekat.fpis_backend.model.Dobavljac;
import com.projekat.fpis_backend.repository.DobavljacRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5174")
public class DobavljacController {

    @Autowired
    private DobavljacRepository dobavljacRepository;

    @PostMapping("/api/dobavljac")
    Dobavljac newDobavljac(@RequestBody Dobavljac newDobavljac){
        return dobavljacRepository.save(newDobavljac);
    }

    @GetMapping("/api/dobavljaci")
    List<Dobavljac> getAllDobavljaci(){
        return dobavljacRepository.findAll();
    }

    @GetMapping("/api/dobavljac/{pib}")
    Dobavljac getDobavljacById(@PathVariable Long pib){
        return dobavljacRepository.findById(pib)
                .orElseThrow(() -> new ResourceNotFoundException("Dobavljac sa PIB " + pib + " nije nadjen"));
    }

    @PutMapping("/api/dobavljac/{pib}")
    Dobavljac updateDobavljac(@RequestBody Dobavljac newDobavljac, @PathVariable Long pib){
        return dobavljacRepository.findById(pib)
                .map(dobavljac -> {
                    dobavljac.setNazivDobavljaca(newDobavljac.getNazivDobavljaca());
                    dobavljac.setTelefon(newDobavljac.getTelefon());
                    dobavljac.setEmailDobavljaca(newDobavljac.getEmailDobavljaca());
                    dobavljac.setTekuciRacun(newDobavljac.getTekuciRacun());
                    dobavljac.setGrad(newDobavljac.getGrad());
                    return dobavljacRepository.save(dobavljac);
                }).orElseThrow(() -> new ResourceNotFoundException("Dobavljac sa PIB " + pib + " nije nadjen"));
    }

    @DeleteMapping("/api/dobavljac/{pib}")
    String deleteDobavljac(@PathVariable Long pib){
        if (!dobavljacRepository.existsById(pib)) {
            throw new ResourceNotFoundException("Dobavljac sa PIB " + pib + " nije nadjen");
        }
        dobavljacRepository.deleteById(pib);
        return "Dobavljac sa PIB " + pib + " je uspesno obrisan";
    }
}
