package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.model.Materijal;

import java.util.List;
import java.util.Optional;

public interface MaterijalService {

    Optional<Materijal> findById(Long sifraMaterijala);
    List<Materijal> findAll();
}
