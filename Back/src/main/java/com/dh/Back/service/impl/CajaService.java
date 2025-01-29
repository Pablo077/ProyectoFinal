package com.dh.Back.service.impl;

import com.dh.Back.entity.Caja;
import com.dh.Back.repository.ICajaRepository;
import com.dh.Back.service.ICajaService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CajaService implements ICajaService {

    private ICajaRepository cajaRepository;

    @Autowired
    public CajaService(ICajaRepository cajaRepository){this.cajaRepository = cajaRepository;}

    @Override
    public Caja save(Caja caja) {
        return cajaRepository.save(caja);
    }

    @Override
    public List<Caja> findAll() {
        return cajaRepository.findAll();
    }

    @Override
    public Optional<Caja> findById(Long id) {
        return cajaRepository.findById(id);
    }

    @PostConstruct
    public void initData() {
        if (cajaRepository.count() == 0) {
            cajaRepository.save(new Caja("Automático"));
            cajaRepository.save(new Caja("Manual"));
            cajaRepository.save(new Caja("Semiautomático"));
        }
    }
}
