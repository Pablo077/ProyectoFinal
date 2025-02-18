package com.dh.Back.controller;

import com.dh.Back.entity.Caja;
import com.dh.Back.entity.Caracteristica;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.ICaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


}
