package com.dh.Back.service;

import com.dh.Back.entity.Puntuacion;
import com.dh.Back.entity.Reserva;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IReservaService {
    String save(Reserva reserva) throws ResourceNotFoundException;
    List<Vehiculo> verificarDisponibilidad (List<Vehiculo> vehiculos, LocalDate fechaInicio, LocalDate fechaFin) throws ResourceNotFoundException;
    List<Reserva> findAll();
    Optional<List<Reserva>> findByVehiculo(Vehiculo vehiculo);
    List<Reserva> findByUserAndVehiculo (Long userId, Long vehiculoId) throws ResourceNotFoundException;
    Optional<Reserva> findById(Long reservaId) throws ResourceNotFoundException;
}
