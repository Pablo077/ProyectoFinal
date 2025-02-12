package com.dh.Back.controller;

import com.dh.Back.dto.VehiculoCategoriaDTO;
import com.dh.Back.entity.*;
import com.dh.Back.repository.ICategoriaRepository;
import com.dh.Back.repository.IUserRepository;
import com.dh.Back.repository.IVehiculoCategoriaRepository;
import com.dh.Back.repository.IVehiculoRepository;
import com.dh.Back.service.ICajaService;
import com.dh.Back.service.IVehiculoCategoriaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<VehiculoCategoria> save(@RequestBody VehiculoCategoria vehiculoCategoria){

        try{
            return ResponseEntity.ok(iVehiculoCategoriaService.save(vehiculoCategoria));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping
    public ResponseEntity<List<VehiculoCategoria>> findAll(){return ResponseEntity.ok(iVehiculoCategoriaService.findAll());}

}
