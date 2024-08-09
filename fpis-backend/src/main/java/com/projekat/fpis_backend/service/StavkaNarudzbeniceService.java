package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.model.StavkaNarudzbenice;
import com.projekat.fpis_backend.model.StavkaNarudzbeniceCompositeKey;
import java.util.List;
import java.util.Optional;

public interface StavkaNarudzbeniceService {
    List<StavkaNarudzbenice> getAllStavkeNarudzbenice();
    Optional<StavkaNarudzbenice> getStavkaNarudzbeniceById(StavkaNarudzbeniceCompositeKey id);
    StavkaNarudzbenice createStavkaNarudzbenice(StavkaNarudzbenice stavkaNarudzbenice);
    StavkaNarudzbenice updateStavkaNarudzbenice(StavkaNarudzbeniceCompositeKey id, StavkaNarudzbenice stavkaNarudzbenice);
    void deleteStavkaNarudzbenice(StavkaNarudzbeniceCompositeKey id);
}
