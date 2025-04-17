package com.dh.Back.service;

import com.dh.Back.dto.PuntuacionPromedioDTO;
import com.dh.Back.entity.Puntuacion;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.entity.User;
import com.dh.Back.exception.ResourceNotFoundException;

import java.util.List;

public interface IPuntuacionService {
    Puntuacion save(Puntuacion puntuacion) throws ResourceNotFoundException;
    List<Puntuacion> findByUserAndVehiculo (Long userId, Long vehiculoId) throws ResourceNotFoundException;
    List<PuntuacionPromedioDTO> puntuacionPromedioByVehiculo() throws ResourceNotFoundException;;
}
