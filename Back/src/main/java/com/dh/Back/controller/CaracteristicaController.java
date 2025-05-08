package com.dh.Back.controller;

import com.dh.Back.entity.Caracteristica;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.ICaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/caracteristica")
public class CaracteristicaController {

    private ICaracteristicaService iCaracteristicaService;

    @Autowired
    public CaracteristicaController(ICaracteristicaService iCaracteristicaService){
        this.iCaracteristicaService = iCaracteristicaService;
    }

    @PostMapping
    public ResponseEntity<Caracteristica> save(@RequestBody Caracteristica caracteristica) throws ResourceNotFoundException {
        return ResponseEntity.ok(iCaracteristicaService.save(caracteristica));
    }

    @GetMapping
    public ResponseEntity<List<Caracteristica>> findAll(){return ResponseEntity.ok(iCaracteristicaService.findAll());}

    @PostMapping("/caracteristicaVehiculo")
    public ResponseEntity<List<Caracteristica>> findByVehiculo(@RequestBody Vehiculo vehiculo) throws ResourceNotFoundException {
        System.out.println("Llamada a /caracteristicaVehiculo");
        return ResponseEntity.ok(iCaracteristicaService.findByVehiculo(vehiculo));
    }

    @PutMapping
    public ResponseEntity<Caracteristica> update(@RequestBody Caracteristica caracteristica) throws ResourceNotFoundException{
        return ResponseEntity.ok(iCaracteristicaService.update(caracteristica));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws ResourceNotFoundException {
        iCaracteristicaService.delete(id);
        return ResponseEntity.ok("Borrado exitoso");
    }
}
