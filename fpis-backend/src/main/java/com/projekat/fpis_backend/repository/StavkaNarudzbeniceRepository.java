package com.projekat.fpis_backend.repository;

import com.projekat.fpis_backend.model.StavkaNarudzbenice;
import com.projekat.fpis_backend.model.StavkaNarudzbeniceCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StavkaNarudzbeniceRepository extends JpaRepository<StavkaNarudzbenice, StavkaNarudzbeniceCompositeKey> {
}
