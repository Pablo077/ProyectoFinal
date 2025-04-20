package com.dh.Back.controller;


import com.dh.Back.dto.BodySavePuntuacionDTO;
import com.dh.Back.dto.PuntuacionPromedioDTO;
import com.dh.Back.dto.ResquestPuntuacionDTO;
import com.dh.Back.entity.Puntuacion;
import com.dh.Back.entity.Reserva;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.entity.User;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.IPuntuacionService;
import com.dh.Back.service.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/puntuacion")
public class PuntuacionController {
    private IPuntuacionService iPuntuacionService;
    private IReservaService iReservaService;

    @Autowired
    public PuntuacionController(IPuntuacionService iPuntuacionService, IReservaService iReservaService){

        this.iPuntuacionService = iPuntuacionService;
        this.iReservaService = iReservaService;
    }

    @PostMapping
    public ResponseEntity<Puntuacion> save(@RequestBody BodySavePuntuacionDTO bodySavePuntuacionDTO) throws ResourceNotFoundException {

        Optional<Reserva> reservaOptional = iReservaService.findById(bodySavePuntuacionDTO.getReservaId());

        if(reservaOptional.isPresent()){
            Reserva reserva = reservaOptional.get();
            Puntuacion puntuacion = new Puntuacion(
                    reserva,
                    bodySavePuntuacionDTO.getValor(),
                    bodySavePuntuacionDTO.getFechaPuntuacion(),
                    bodySavePuntuacionDTO.getResena()
            );
            return ResponseEntity.ok(iPuntuacionService.save(puntuacion));
        } else {
            throw new ResourceNotFoundException("Reserva no se encuentra con el ID: " + bodySavePuntuacionDTO.getReservaId());
        }
    }

//    @PostMapping
//    public ResponseEntity<?> recibirBody(@RequestBody Map<String, Object> body) {
//        System.out.println("Body recibido: " + body);
//        return ResponseEntity.ok().build();
//    }

    @PostMapping("/PuntuacionesByUserVehiculo")
    public ResponseEntity<List<Puntuacion>> findByUserAndVehiculo(@RequestBody ResquestPuntuacionDTO resquestPuntuacionDTO) throws ResourceNotFoundException{
        return ResponseEntity.ok(iPuntuacionService.findByUserAndVehiculo(resquestPuntuacionDTO.getUserId(), resquestPuntuacionDTO.getVehiculoId()));
    }

    @GetMapping("/PuntuacionesByVehiculo/{vehiculoId}")
    public ResponseEntity<List<Puntuacion>> findByVehiculo(@PathVariable Long vehiculoId) throws ResourceNotFoundException{
        return ResponseEntity.ok(iPuntuacionService.findByVehiculo(vehiculoId));
    }

    @GetMapping("/PuntuacionesPromedio")
    public ResponseEntity<List<PuntuacionPromedioDTO>> puntuacionPromedioByVehiculo() throws ResourceNotFoundException{
        return ResponseEntity.ok(iPuntuacionService.puntuacionPromedioByVehiculo());
    }

//    @GetMapping("/PuntuacionesPromedio")
//    public ResponseEntity<String> puntuacionPromedioByVehiculo() throws ResourceNotFoundException{
//        return ResponseEntity.ok("LLega");
//    }

}
