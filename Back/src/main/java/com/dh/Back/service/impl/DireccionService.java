package com.dh.Back.service.impl;

import com.dh.Back.entity.Direccion;
import com.dh.Back.repository.IDireccionRepository;
import com.dh.Back.service.IDireccionService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DireccionService implements IDireccionService {

    private IDireccionRepository direccionRepository;

    @Autowired
    public DireccionService(IDireccionRepository direccionRepository){this.direccionRepository = direccionRepository;}

    @Override
    public Direccion save(Direccion direccion) {
        return direccionRepository.save(direccion);
    }

    @Override
    public List<Direccion> findAll() {
        return direccionRepository.findAll();
    }

    @Override
    public Optional<Direccion> findById(Long id) {
        return direccionRepository.findById(id);
    }

    @PostConstruct
    public void initData(){
        if(direccionRepository.count()==0){
            direccionRepository.save(new Direccion("Asistido"));
            direccionRepository.save(new Direccion("Hibrido"));
            direccionRepository.save(new Direccion("Manual"));
        }
    }
}
