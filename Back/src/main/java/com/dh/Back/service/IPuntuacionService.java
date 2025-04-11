package com.dh.Back.service;

import com.dh.Back.entity.Puntuacion;
import com.dh.Back.exception.ResourceNotFoundException;

public interface IPuntuacionService {
    Puntuacion save(Puntuacion puntuacion) throws ResourceNotFoundException;
}
