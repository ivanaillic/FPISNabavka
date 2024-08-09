package com.projekat.fpis_backend.service;

import com.projekat.fpis_backend.exception.ResourceNotFoundException;
import com.projekat.fpis_backend.model.StavkaNarudzbenice;
import com.projekat.fpis_backend.model.StavkaNarudzbeniceCompositeKey;
import com.projekat.fpis_backend.repository.StavkaNarudzbeniceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StavkaNarudzbeniceServiceImpl implements StavkaNarudzbeniceService {

    @Autowired
    private StavkaNarudzbeniceRepository stavkaNarudzbeniceRepository;

    @Override
    public List<StavkaNarudzbenice> getAllStavkeNarudzbenice() {
        return stavkaNarudzbeniceRepository.findAll();
    }

    @Override
    public Optional<StavkaNarudzbenice> getStavkaNarudzbeniceById(StavkaNarudzbeniceCompositeKey id) {
        return stavkaNarudzbeniceRepository.findById(id);
    }

    @Override
    public StavkaNarudzbenice createStavkaNarudzbenice(StavkaNarudzbenice stavkaNarudzbenice) {
        return stavkaNarudzbeniceRepository.save(stavkaNarudzbenice);
    }

    @Override
    public StavkaNarudzbenice updateStavkaNarudzbenice(StavkaNarudzbeniceCompositeKey id, StavkaNarudzbenice stavkaNarudzbenice) {
        if (!stavkaNarudzbeniceRepository.existsById(id)) {
            throw new ResourceNotFoundException("StavkaNarudzbenice with id " + id + " not found");
        }
        stavkaNarudzbenice.setId(id);
        return stavkaNarudzbeniceRepository.save(stavkaNarudzbenice);
    }

    @Override
    public void deleteStavkaNarudzbenice(StavkaNarudzbeniceCompositeKey id) {
        if (stavkaNarudzbeniceRepository.existsById(id)) {
            stavkaNarudzbeniceRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("StavkaNarudzbenice with id " + id + " not found");
        }
    }
}
