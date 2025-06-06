package com.dh.Back.controller;
import com.dh.Back.dto.CorreoRequestDTO;
import com.dh.Back.dto.ReservaDTO;
import com.dh.Back.entity.Reserva;
import com.dh.Back.entity.User;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.IEmailService;
import com.dh.Back.service.IReservaService;
import com.dh.Back.service.IVehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/reserva")
public class ReservaController {

    private IReservaService iReservaService;
    private IVehiculoService iVehiculoService;
    private IEmailService iEmailService;

    @Autowired
    public ReservaController(IReservaService iReservaService, IVehiculoService iVehiculoService, IEmailService iEmailService){
        this.iReservaService = iReservaService;
        this.iVehiculoService = iVehiculoService;
        this.iEmailService = iEmailService;
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
        Optional<Vehiculo> findVehiculo = iVehiculoService.findById(reserva.getVehiculo().getId());
        String response = iReservaService.save(reserva);

        if(response.equals("Reserva guardada con éxito")){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String fechaInicio = reserva.getFechaInicio().format(formatter);
            String fechaFin = reserva.getFechaFin().format(formatter);

            LocalDateTime ahora = LocalDateTime.now();
            DateTimeFormatter formatterNow = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
            String fechaHoraFormateada = ahora.format(formatterNow);

            CorreoRequestDTO correoRequestDTO = new CorreoRequestDTO();
            correoRequestDTO.setDestinatario(reserva.getUser().getEmail());
            if(findVehiculo.isPresent()){
                correoRequestDTO.setAsunto("Reserva confirmada de: " + findVehiculo.get().getMarca() + " " + findVehiculo.get().getModelo());
                correoRequestDTO.setMensaje("La reserva del vehículo " + findVehiculo.get().getMarca() + " " + findVehiculo.get().getModelo() +
                        " para la fecha desde " + fechaInicio + " hasta " + fechaFin + " fue confirmada el " + fechaHoraFormateada + "." );
                correoRequestDTO.setTipo("Reserva");
                iEmailService.enviarCorreo(correoRequestDTO);
            }

        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/disponibilidad")
    public ResponseEntity<List<Vehiculo>> verificarDisponibilidad(@RequestBody ReservaDTO reservaDTO) throws ResourceNotFoundException{

        List<Vehiculo> vehiculos = iVehiculoService.buscarVehiculosDisponibles(
                reservaDTO.getMarca(), reservaDTO.getModelo(), reservaDTO.getPasajeros());

        List<Vehiculo> disponibles = iReservaService.verificarDisponibilidad(vehiculos,
                reservaDTO.getFechaInicio(), reservaDTO.getFechaFin());
        return ResponseEntity.ok(disponibles);
    }

    @GetMapping("/historialReserva/{userId}/{vehiculoId}")
    public ResponseEntity<List<Reserva>> findByUserAndVehiculo(@PathVariable Long userId, @PathVariable Long vehiculoId) throws ResourceNotFoundException{
        return ResponseEntity.ok(
                iReservaService.findByUserAndVehiculo(userId, vehiculoId)
        );
    }

    @PostMapping("/historialReservasUser")
    public ResponseEntity<Optional<List<Reserva>>> findByUser(@RequestBody User user) throws ResourceNotFoundException {
        return ResponseEntity.ok(iReservaService.findByUser(user));
    }

}
