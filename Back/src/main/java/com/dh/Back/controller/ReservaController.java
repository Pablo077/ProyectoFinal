package com.dh.Back.controller;
import com.dh.Back.dto.ReservaDTO;
import com.dh.Back.dto.ResquestReservaDTO;
import com.dh.Back.entity.Caja;
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
import java.util.Optional;
import java.util.Map;


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

    @GetMapping
    public ResponseEntity<List<Reserva>> findAll(){
        return ResponseEntity.ok(iReservaService.findAll());
    }

    @PostMapping("/reservaByVehiculo")
    public ResponseEntity<Optional<List<Reserva>>> findByVehiculo(@RequestBody Vehiculo vehiculo){
        return ResponseEntity.ok(iReservaService.findByVehiculo(vehiculo));
    }

    @PostMapping("/saveReservas")
    public ResponseEntity<String> save(@RequestBody Reserva reserva) throws ResourceNotFoundException {
        return ResponseEntity.ok(iReservaService.save(reserva));
    }

//        @PostMapping("/saveReservas")
//    public ResponseEntity<?> recibirBody(@RequestBody Map<String, Object> body) {
//        System.out.println("Body recibido: " + body);
//        return ResponseEntity.ok().build();
//    }
    
    @PostMapping("/disponibilidad")
    public ResponseEntity<List<Vehiculo>> verificarDisponibilidad(@RequestBody ReservaDTO reservaDTO) throws ResourceNotFoundException{

        List<Vehiculo> vehiculos = iVehiculoService.buscarVehiculosDisponibles(
                reservaDTO.getMarca(), reservaDTO.getModelo(), reservaDTO.getPasajeros());

        List<Vehiculo> disponibles = iReservaService.verificarDisponibilidad(vehiculos,
                reservaDTO.getFechaInicio(), reservaDTO.getFechaFin());
        return ResponseEntity.ok(disponibles);
    }

    @PostMapping("/historialReserva")
    public ResponseEntity<List<Reserva>> findByUserAndVehiculo(@RequestBody ResquestReservaDTO resquestReservaDTO) throws ResourceNotFoundException{
        return ResponseEntity.ok(
                iReservaService.findByUserAndVehiculo(resquestReservaDTO.getUserId(), resquestReservaDTO.getVehiculoId())
        );
    }

}
