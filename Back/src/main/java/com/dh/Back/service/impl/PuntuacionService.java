package com.dh.Back.service.impl;

import com.dh.Back.entity.Puntuacion;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IPuntuacionRepository;
import com.dh.Back.service.IPuntuacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PuntuacionService implements IPuntuacionService {
    private IPuntuacionRepository puntuacionRepository;

    @Autowired
    public PuntuacionService(IPuntuacionRepository puntuacionRepository){
        this.puntuacionRepository = puntuacionRepository;
    }

    @Override
    public Puntuacion save(Puntuacion puntuacion) throws ResourceNotFoundException {
        try{
            return puntuacionRepository.save(puntuacion);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }
}
