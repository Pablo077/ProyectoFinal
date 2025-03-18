package com.dh.Back.service.impl;
import com.dh.Back.authentication.RegisterRequest;
import com.dh.Back.entity.Reserva;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IReservaRepository;
import com.dh.Back.service.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaService implements IReservaService {

    private IReservaRepository reservaRepository;

    @Autowired
    public ReservaService(IReservaRepository reservaRepository){
        this.reservaRepository = reservaRepository;
    }

    @Override
    public Reserva save(Reserva reserva) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public List<Vehiculo> verificarDisponibilidad(List<Vehiculo> vehiculos, LocalDate fechaInicio, LocalDate fechaFin) throws ResourceNotFoundException {
        // Filtrar vehículos disponibles
        return vehiculos.stream()
                .filter(vehiculo -> reservaRepository.verificarDisponibilidad(vehiculo.getId(), fechaInicio, fechaFin).isEmpty())
                .collect(Collectors.toList());

    }
}
