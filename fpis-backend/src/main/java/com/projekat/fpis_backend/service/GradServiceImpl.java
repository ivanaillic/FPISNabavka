package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.model.Grad;
import com.projekat.fpis_backend.repository.GradRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradServiceImpl implements GradService {

    private final GradRepository gradRepository;

    @Autowired
    public GradServiceImpl(GradRepository gradRepository) {
        this.gradRepository = gradRepository;
    }

    @Override
    public Optional<Grad> findById(Long ptt) {
        return gradRepository.findById(ptt);
    }

    @Override
    public List<Grad> findAll() {
        return gradRepository.findAll();
    }
}
