package com.projekat.fpis_backend.repository;

import com.projekat.fpis_backend.model.Narudzbenica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NarudzbenicaRepository extends JpaRepository<Narudzbenica, Long> {
}
