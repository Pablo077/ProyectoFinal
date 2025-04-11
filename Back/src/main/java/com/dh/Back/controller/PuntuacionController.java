package com.dh.Back.controller;


import com.dh.Back.entity.Puntuacion;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.IPuntuacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/puntuacion")
public class PuntuacionController {
    private IPuntuacionService iPuntuacionService;

    @Autowired
    public PuntuacionController(IPuntuacionService iPuntuacionService){
        this.iPuntuacionService = iPuntuacionService;
    }

    @PostMapping
    public ResponseEntity<Puntuacion> save(@RequestBody Puntuacion puntuacion) throws ResourceNotFoundException {
        System.out.println(puntuacion);
        return ResponseEntity.ok(iPuntuacionService.save(puntuacion));
    }
}
