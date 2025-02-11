package com.dh.Back.service;

import com.dh.Back.entity.VehiculoCategoria;

import java.util.List;
import java.util.Optional;

public interface IVehiculoCategoriaService {
    VehiculoCategoria save(VehiculoCategoria vehiculoCategoria);
    List<VehiculoCategoria> findAll();
    Optional<VehiculoCategoria> findById(Long id);
}
