package com.dh.Back.service;

import com.dh.Back.entity.Caja;

import java.util.List;
import java.util.Optional;

public interface ICajaService {
    Caja save(Caja caja);
    List<Caja> findAll();
    Optional<Caja> findById(Long id);
}
