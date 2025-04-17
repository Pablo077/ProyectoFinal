package com.dh.Back.service.impl;
import com.dh.Back.authentication.RegisterRequest;
import com.dh.Back.data.ReservaDataLoader;
import com.dh.Back.entity.Caja;
import com.dh.Back.entity.Reserva;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IReservaRepository;
import com.dh.Back.service.IReservaService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservaService implements IReservaService {

    private IReservaRepository reservaRepository;
    private ReservaDataLoader reservaDataLoader;

    @Autowired
    public ReservaService(IReservaRepository reservaRepository, ReservaDataLoader reservaDataLoader){
        this.reservaRepository = reservaRepository;
        this.reservaDataLoader = reservaDataLoader;
    }

    @Override
    public Reserva save(Reserva reserva) throws ResourceNotFoundException {
        try{
            return reservaRepository.save(reserva);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
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

//    @EventListener(ApplicationReadyEvent.class)
//    public void initData() {
//        if (reservaDataLoader == null || reservaRepository == null) {
//            throw new IllegalStateException("reservaDataLoader o reservaRepository no están inicializados.");
//        }
//
//        List<Reserva> reservas = reservaDataLoader.getReservas();
//        for (Reserva reserva : reservaDataLoader.getReservas()) {
//            reservaRepository.save(reserva);
//        }
//    }
}
