package com.dh.Back.service.impl;

import com.dh.Back.entity.VehiculoCategoria;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IVehiculoCategoriaRepository;
import com.dh.Back.service.IVehiculoCategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculoCategoriaService  implements IVehiculoCategoriaService {

    private IVehiculoCategoriaRepository vehiculoCategoriaRepository;

    @Autowired
    public VehiculoCategoriaService (IVehiculoCategoriaRepository vehiculoCategoriaRepository){
        this.vehiculoCategoriaRepository = vehiculoCategoriaRepository;
    }

    @Override
    public VehiculoCategoria save(VehiculoCategoria vehiculoCategoria) throws ResourceNotFoundException {
        try{
            return vehiculoCategoriaRepository.save(vehiculoCategoria);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }

    }

    @Override
    public List<VehiculoCategoria> findAll() {
        return vehiculoCategoriaRepository.findAll();
    }

    @Override
    public Optional<VehiculoCategoria> findById(Long id) {
        return vehiculoCategoriaRepository.findById(id);
    }
}
