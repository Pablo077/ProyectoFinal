package com.dh.Back.service.impl;

import com.dh.Back.dto.PuntuacionPromedioDTO;
import com.dh.Back.entity.Puntuacion;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IPuntuacionRepository;
import com.dh.Back.service.IPuntuacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<Puntuacion> findByUserAndVehiculo(Long userId, Long vehiculoId) throws ResourceNotFoundException {
        try{
            return puntuacionRepository.findByUserAndVehiculo(userId, vehiculoId);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }

    }

    @Override
    public List<PuntuacionPromedioDTO> puntuacionPromedioByVehiculo() throws ResourceNotFoundException {
        try{
            return puntuacionRepository.puntuacionPromedioByVehiculo();
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public List<Puntuacion> findByVehiculo(Long vehiculoId) throws ResourceNotFoundException {
        try{
            return puntuacionRepository.findByVehiculo(vehiculoId);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }
}
