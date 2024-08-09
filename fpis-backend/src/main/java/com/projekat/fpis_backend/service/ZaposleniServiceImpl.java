package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.model.Zaposleni;
import com.projekat.fpis_backend.repository.ZaposleniRepository;
import com.projekat.fpis_backend.service.ZaposleniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ZaposleniServiceImpl implements ZaposleniService {

    private final ZaposleniRepository zaposleniRepository;

    @Autowired
    public ZaposleniServiceImpl(ZaposleniRepository zaposleniRepository) {
        this.zaposleniRepository = zaposleniRepository;
    }

    @Override
    public Optional<Zaposleni> findById(Long sifraZaposlenog) {
        return zaposleniRepository.findById(sifraZaposlenog);
    }

    @Override
    public List<Zaposleni> findAll() {
        return zaposleniRepository.findAll();
    }


}
