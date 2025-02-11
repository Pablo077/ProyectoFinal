package com.dh.Back.service;

import com.dh.Back.entity.Categoria;

import java.util.List;
import java.util.Optional;

public interface ICategoriaService {
    Categoria save(Categoria categoria);
    List<Categoria> findAll();
    Optional<Categoria> findById(Long id);
}
