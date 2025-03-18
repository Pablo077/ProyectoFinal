package com.dh.Back.controller;
import com.dh.Back.dto.ReservaDTO;
import com.dh.Back.entity.Reserva;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.IReservaService;
import com.dh.Back.service.IVehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reserva")
public class ReservaController {

    private IReservaService iReservaService;
    private IVehiculoService iVehiculoService;

    @Autowired
    public ReservaController(IReservaService iReservaService, IVehiculoService iVehiculoService){
        this.iReservaService = iReservaService;
        this.iVehiculoService = iVehiculoService;
    }

    @PostMapping("/disponibilidad")
    public ResponseEntity<List<Vehiculo>> verificarDisponibilidad(@RequestBody ReservaDTO reservaDTO) throws ResourceNotFoundException{

        List<Vehiculo> vehiculos = iVehiculoService.buscarVehiculosDisponibles(
                reservaDTO.getMarca(), reservaDTO.getModelo(), reservaDTO.getPasajeros());

        return ResponseEntity.ok(iReservaService.verificarDisponibilidad(vehiculos,
                reservaDTO.getFechaInicio(), reservaDTO.getFechaFin()));
    }

}
