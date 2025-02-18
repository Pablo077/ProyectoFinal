package com.dh.Back.service;

import com.dh.Back.entity.Caja;
import com.dh.Back.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface ICajaService {
    Caja save(Caja caja) throws ResourceNotFoundException;
    List<Caja> findAll();
    Optional<Caja> findById(Long id);
}
