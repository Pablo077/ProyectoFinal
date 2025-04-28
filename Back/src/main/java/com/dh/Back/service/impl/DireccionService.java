package com.dh.Back.service.impl;

import com.dh.Back.entity.Direccion;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IDireccionRepository;
import com.dh.Back.service.IDireccionService;
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
    public Direccion save(Direccion direccion) throws ResourceNotFoundException  {
        try{
            return direccionRepository.save(direccion);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public List<Direccion> findAll() {
        return direccionRepository.findAll();
    }

    @Override
    public Optional<Direccion> findById(Long id) {
        return direccionRepository.findById(id);
    }

}
