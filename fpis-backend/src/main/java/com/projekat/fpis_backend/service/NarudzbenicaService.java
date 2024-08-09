package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.model.Narudzbenica;
import java.util.List;
import java.util.Optional;

public interface NarudzbenicaService {
    List<Narudzbenica> getAllNarudzbenice();
    Optional<Narudzbenica> getNarudzbenicaById(Long id);
    Narudzbenica createNarudzbenica(Narudzbenica narudzbenica);
    Narudzbenica updateNarudzbenica(Long id, Narudzbenica narudzbenica);
    void deleteNarudzbenica(Long id);
}
