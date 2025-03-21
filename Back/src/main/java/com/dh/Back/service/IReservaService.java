package com.dh.Back.service;

import com.dh.Back.entity.Reserva;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IReservaService {
    Reserva save(Reserva reserva) throws ResourceNotFoundException;
    List<Vehiculo> verificarDisponibilidad (List<Vehiculo> vehiculos, LocalDate fechaInicio, LocalDate fechaFin) throws ResourceNotFoundException;
    List<Reserva> findAll();
    Optional<List<Reserva>> findByVehiculo(Vehiculo vehiculo);
}
