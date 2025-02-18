package com.dh.Back.controller;

import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.ICategoriaRepository;
import com.dh.Back.repository.IUserRepository;
import com.dh.Back.repository.IVehiculoCategoriaRepository;
import com.dh.Back.repository.IVehiculoRepository;
import com.dh.Back.service.IVehiculoCategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/vehiculoCategoria")
public class VehiculoCategoriaController {

    private IVehiculoCategoriaService iVehiculoCategoriaService;
    private IVehiculoRepository vehiculoRepository;
    private ICategoriaRepository categoriaRepository;
    private IUserRepository userRepository;
    private IVehiculoCategoriaRepository vehiculoCategoriaRepository;

    @Autowired
    public VehiculoCategoriaController(IVehiculoCategoriaService iVehiculoCategoriaService) {
        this.iVehiculoCategoriaService = iVehiculoCategoriaService;
    }

    @PostMapping
    public ResponseEntity<VehiculoCategoria> save(@RequestBody VehiculoCategoria vehiculoCategoria) throws ResourceNotFoundException {
        return ResponseEntity.ok(iVehiculoCategoriaService.save(vehiculoCategoria));
    }

    @GetMapping
    public ResponseEntity<List<VehiculoCategoria>> findAll(){return ResponseEntity.ok(iVehiculoCategoriaService.findAll());}

}
