package com.dh.Back.service;

import com.dh.Back.entity.Direccion;

import java.util.List;

public interface IDireccionService {
    Direccion save(Direccion direccion);
    List<Direccion> findAll();
}
