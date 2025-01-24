package com.dh.Back.service;

import com.dh.Back.entity.Direccion;

import java.util.List;
import java.util.Optional;

public interface IDireccionService {
    Direccion save(Direccion direccion);
    List<Direccion> findAll();
    Optional<Direccion> findById(Long id);
}
