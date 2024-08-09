package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.model.Dobavljac;

import java.util.List;
import java.util.Optional;

public interface DobavljacService {

    Dobavljac createDobavljac(Dobavljac dobavljac);
    Dobavljac updateDobavljac(Dobavljac dobavljac);
    void deleteDobavljac(Long pibDobavljaca);
    Optional<Dobavljac> findById(Long pibDobavljaca);
    List<Dobavljac> findAll();
}
