package com.dh.Back.service;

import com.dh.Back.entity.Favorito;
import com.dh.Back.entity.User;
import com.dh.Back.exception.ResourceNotFoundException;

import java.util.List;

public interface IFavoritoService {
    Favorito save(Favorito favorito) throws ResourceNotFoundException;
    List<Favorito> findByUser(User user);
    List<Favorito> findAll();
}
