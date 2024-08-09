package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.model.Materijal;
import com.projekat.fpis_backend.repository.MaterijalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterijalServiceImpl implements MaterijalService {

    private final MaterijalRepository materijalRepository;

    @Autowired
    public MaterijalServiceImpl(MaterijalRepository materijalRepository) {
        this.materijalRepository = materijalRepository;
    }

    @Override
    public Optional<Materijal> findById(Long sifraMaterijala) {
        return materijalRepository.findById(sifraMaterijala);
    }

    @Override
    public List<Materijal> findAll() {
        return materijalRepository.findAll();
    }
}
