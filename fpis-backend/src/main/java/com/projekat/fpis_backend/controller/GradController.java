package com.projekat.fpis_backend.controller;

import com.projekat.fpis_backend.exception.ResourceNotFoundException;
import com.projekat.fpis_backend.model.Grad;
import com.projekat.fpis_backend.repository.GradRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5174")
public class GradController {

    @Autowired
    private GradRepository gradRepository;


    @GetMapping("/gradovi")
    public List<Grad> getAllGradovi() {
        return gradRepository.findAll();
    }

    @GetMapping("/grad/{ptt}")
    public Grad getGradById(@PathVariable Long ptt) {
        return gradRepository.findById(ptt)
                .orElseThrow(() -> new ResourceNotFoundException("Grad with PTT " + ptt + " not found"));
    }



}
