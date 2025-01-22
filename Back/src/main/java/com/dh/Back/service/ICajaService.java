package com.dh.Back.service;

import com.dh.Back.entity.Caja;

import java.util.List;

public interface ICajaService {
    Caja save(Caja caja);
    List<Caja> findAll();
}
