package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.model.Dobavljac;
import com.projekat.fpis_backend.repository.DobavljacRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DobavljacServiceImpl implements DobavljacService {

    private final DobavljacRepository dobavljacRepository;

    @Autowired
    public DobavljacServiceImpl(DobavljacRepository dobavljacRepository) {
        this.dobavljacRepository = dobavljacRepository;
    }

    @Override
    public Dobavljac createDobavljac(Dobavljac dobavljac) {
        return dobavljacRepository.save(dobavljac);
    }

    @Override
    public Dobavljac updateDobavljac(Dobavljac dobavljac) {
        if (dobavljacRepository.existsById(dobavljac.getPibDobavljaca())) {
            return dobavljacRepository.save(dobavljac);
        }
        throw new RuntimeException("Dobavljac sa id " + dobavljac.getPibDobavljaca() + " ne postoji");
    }

    @Override
    public void deleteDobavljac(Long pibDobavljaca) {
        if (dobavljacRepository.existsById(pibDobavljaca)) {
            dobavljacRepository.deleteById(pibDobavljaca);
        } else {
            throw new RuntimeException("Dobavljac sa id " + pibDobavljaca + " ne postoji");
        }
    }

    @Override
    public Optional<Dobavljac> findById(Long pibDobavljaca) {
        return dobavljacRepository.findById(pibDobavljaca);
    }

    @Override
    public List<Dobavljac> findAll() {
        return dobavljacRepository.findAll();
    }
}
