package com.dh.Back.service;

import com.dh.Back.entity.Favorito;
import com.dh.Back.entity.User;
import com.dh.Back.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IFavoritoService {
    Favorito save(Favorito favorito) throws ResourceNotFoundException;
    List<Favorito> findByUser(User user);
    List<Favorito> findAll();
    Optional<Favorito> findById(Long id);
    void delete(Long id) throws ResourceNotFoundException;
}
