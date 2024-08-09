package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.model.Zaposleni;

import java.util.List;
import java.util.Optional;

public interface ZaposleniService {

    Optional<Zaposleni> findById(Long sifraZaposlenog);
    List<Zaposleni> findAll();

}

