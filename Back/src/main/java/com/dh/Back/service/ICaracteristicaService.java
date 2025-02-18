package com.dh.Back.service;

import com.dh.Back.entity.Caracteristica;
import com.dh.Back.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface ICaracteristicaService {
    Caracteristica save(Caracteristica caracteristica) throws ResourceNotFoundException;
    List<Caracteristica> findAll();
    Optional<Caracteristica> findById(Long id);
}
