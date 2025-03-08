package com.dh.Back.service;

import com.dh.Back.entity.Caracteristica;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface ICaracteristicaService {
    Caracteristica save(Caracteristica caracteristica) throws ResourceNotFoundException;
    List<Caracteristica> findAll();
    Optional<Caracteristica> findById(Long id);
    List<Caracteristica> findByVehiculo(Vehiculo vehiculo) throws ResourceNotFoundException;
    Caracteristica update(Caracteristica caracteristica);
    void delete(Long id) throws ResourceNotFoundException;
}
