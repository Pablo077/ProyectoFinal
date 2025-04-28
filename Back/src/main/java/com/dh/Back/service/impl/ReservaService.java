package com.dh.Back.service.impl;
import com.dh.Back.entity.Reserva;
import com.dh.Back.entity.User;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IReservaRepository;
import com.dh.Back.service.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservaService implements IReservaService {

    private IReservaRepository reservaRepository;


    @Autowired
    public ReservaService(IReservaRepository reservaRepository){
        this.reservaRepository = reservaRepository;
    }

    @Override
    public String save(Reserva reserva) {

        if (reserva.getVehiculo() == null || reserva.getVehiculo().getId() == null) {
            return "Error: El vehículo asociado a la reserva no es válido.";
        }

        LocalDate fechaInicio = reserva.getFechaInicio();
        LocalDate fechaFin = reserva.getFechaFin();
        Long vehiculoId = reserva.getVehiculo().getId();

        // Verificar disponibilidad del vehículo para el rango de fechas
        if (!reservaRepository.verificarDisponibilidad(vehiculoId, fechaInicio, fechaFin).isEmpty()) {
            return String.format("El vehículo no está disponible.");
        }

        try {
            reservaRepository.save(reserva);
            return "Reserva guardada con éxito";
        } catch (Exception e) {
            return "Error al guardar la reserva: " + e.getMessage();
        }
    }

    @Override
    public List<Vehiculo> verificarDisponibilidad(List<Vehiculo> vehiculos, LocalDate fechaInicio, LocalDate fechaFin) throws ResourceNotFoundException {
        // Filtrar vehículos disponibles
        return vehiculos.stream()
                .filter(vehiculo -> reservaRepository.verificarDisponibilidad(vehiculo.getId(), fechaInicio, fechaFin).isEmpty())
                .collect(Collectors.toList());

    }

    @Override
    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    @Override
    public Optional<List<Reserva>> findByVehiculo(Vehiculo vehiculo) {
        return reservaRepository.findByVehiculo(vehiculo);
    }

    @Override
    public List<Reserva> findByUserAndVehiculo(Long userId, Long vehiculoId) throws ResourceNotFoundException {
        try{
            return reservaRepository.findByUserAndVehiculo(userId, vehiculoId);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public Optional<Reserva> findById(Long reservaId) throws ResourceNotFoundException {
        try{
            return reservaRepository.findById(reservaId);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public Optional<List<Reserva>> findByUser(User user) throws ResourceNotFoundException {
        try{
            return reservaRepository.findByUser(user);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

}
