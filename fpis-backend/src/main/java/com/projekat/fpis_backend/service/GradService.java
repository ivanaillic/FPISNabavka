package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.model.Grad;

import java.util.List;
import java.util.Optional;

public interface GradService {

    Optional<Grad> findById(Long ptt);
    List<Grad> findAll();
}
