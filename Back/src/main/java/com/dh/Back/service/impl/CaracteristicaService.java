package com.dh.Back.service.impl;

import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.ICaracteristicaRepository;
import com.dh.Back.service.ICaracteristicaService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService implements ICaracteristicaService {

    private ICaracteristicaRepository caracteristicaRepository;

    @Autowired
    public CaracteristicaService(ICaracteristicaRepository caracteristicaRepository){
        this.caracteristicaRepository = caracteristicaRepository;
    }


    @Override
    public Caracteristica save(Caracteristica caracteristica) throws ResourceNotFoundException {
        try{
            return caracteristicaRepository.save(caracteristica);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public List<Caracteristica> findAll() {
        return caracteristicaRepository.findAll();
    }

    @Override
    public Optional<Caracteristica> findById(Long id) {
        return caracteristicaRepository.findById(id);
    }

    @Override
    public List<Caracteristica> findByVehiculo(Vehiculo vehiculo) throws ResourceNotFoundException{
        try{
            return caracteristicaRepository.findByVehiculo(vehiculo);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public Caracteristica update(Caracteristica caracteristica) {
        return caracteristicaRepository.save(caracteristica);
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        Optional<Caracteristica> caracteristicaFindById = findById(id);

        if(caracteristicaFindById.isPresent()){
            caracteristicaRepository.deleteById(caracteristicaFindById.get().getId());
        }
        else {
            throw new ResourceNotFoundException("No se pudo eliminar la caracteristica con id: " + id);
        }
    }

}
