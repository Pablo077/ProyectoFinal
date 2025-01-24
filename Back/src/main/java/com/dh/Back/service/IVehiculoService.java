package com.dh.Back.service;

import com.dh.Back.entity.Vehiculo;

import java.util.List;

public interface IVehiculoService {
    Vehiculo save(Vehiculo vehiculo);
    List<Vehiculo> findAll();
}
