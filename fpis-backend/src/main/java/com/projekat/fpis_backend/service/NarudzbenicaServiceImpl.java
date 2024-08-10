package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.exception.ResourceNotFoundException;
import com.projekat.fpis_backend.model.Narudzbenica;
import com.projekat.fpis_backend.model.Status;
import com.projekat.fpis_backend.repository.NarudzbenicaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NarudzbenicaServiceImpl implements NarudzbenicaService {

    private static final Logger logger = LoggerFactory.getLogger(NarudzbenicaServiceImpl.class);
    @Autowired
    private NarudzbenicaRepository narudzbenicaRepository;

    @Override
    public List<Narudzbenica> getAllNarudzbenice() {
        return narudzbenicaRepository.findAll();
    }

    @Override
    public Optional<Narudzbenica> getNarudzbenicaById(Long id) {
        return narudzbenicaRepository.findById(id);
    }

    @Override
    public Narudzbenica createNarudzbenica(Narudzbenica narudzbenica) {
        logger.info("Početak kreiranja narudžbenice: {}", narudzbenica);

        // Logovanje svake stavke narudžbenice
        narudzbenica.getStavkeNarudzbenice().forEach(stavka -> {
            logger.info("Stavka narudžbenice: {}", stavka);
            stavka.setNarudzbenica(narudzbenica);
        });

        Narudzbenica savedNarudzbenica = narudzbenicaRepository.save(narudzbenica);
        logger.info("Narudžbenica uspešno sačuvana: {}", savedNarudzbenica);

        return savedNarudzbenica;
    }

    @Override
    public Narudzbenica updateNarudzbenica(Long id, Narudzbenica narudzbenica) {
        if (!narudzbenicaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Narudzbenica with id " + id + " not found");
        }
        narudzbenica.setBrojNarudzbenice(id);
        narudzbenica.getStavkeNarudzbenice().forEach(stavka -> stavka.setNarudzbenica(narudzbenica));
        return narudzbenicaRepository.save(narudzbenica);
    }

    @Override
    public void deleteNarudzbenica(Long id) {
        if (narudzbenicaRepository.existsById(id)) {
            narudzbenicaRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Narudzbenica with id " + id + " not found");
        }
    }
}

