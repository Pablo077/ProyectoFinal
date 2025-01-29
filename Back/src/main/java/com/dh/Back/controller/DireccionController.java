package com.dh.Back.controller;

import com.dh.Back.entity.Direccion;
import com.dh.Back.service.IDireccionService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.log4j.Logger;

import java.util.List;


@RestController
@RequestMapping("/direccion")
public class DireccionController {

    private IDireccionService iDireccionService;
    private static final Logger LOGGER = Logger.getLogger(DireccionController.class);

    @Autowired
    public DireccionController(IDireccionService iDireccionService){
        this.iDireccionService = iDireccionService;
    }

    @PostMapping
    public ResponseEntity<Direccion> save(@RequestBody Direccion direccion){
        try {
            return ResponseEntity.ok(iDireccionService.save(direccion));
        }catch (Exception e){
            System.out.println(e);
            LOGGER.warn(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Direccion>> findAll(){return ResponseEntity.ok(iDireccionService.findAll());}
}
