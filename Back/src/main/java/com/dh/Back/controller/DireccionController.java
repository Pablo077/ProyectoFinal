package com.dh.Back.controller;

import com.dh.Back.entity.Direccion;
import com.dh.Back.service.IDireccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/direccion")
public class DireccionController {

    private IDireccionService iDireccionService;

    @Autowired
    public DireccionController(IDireccionService iDireccionService){
        this.iDireccionService = iDireccionService;
    }

    @PostMapping
    public ResponseEntity<Direccion> save(@RequestBody Direccion direccion){
        return ResponseEntity.ok(iDireccionService.save(direccion));
    }

    @GetMapping
    public ResponseEntity<List<Direccion>> findAll(){return ResponseEntity.ok(iDireccionService.findAll());}
}
