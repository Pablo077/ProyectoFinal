package com.dh.Back.service;

import com.dh.Back.entity.Vehiculo;

import java.util.List;
import java.util.Optional;

public interface IVehiculoService {
    Vehiculo save(Vehiculo vehiculo);
    List<Vehiculo> findAll();
    Optional<Vehiculo> findByMarcaAndModelo(String marca, String modelo);
}
