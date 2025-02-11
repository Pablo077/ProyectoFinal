package com.dh.Back.controller;

import com.dh.Back.entity.Caja;
import com.dh.Back.entity.VehiculoCategoria;
import com.dh.Back.service.ICajaService;
import com.dh.Back.service.IVehiculoCategoriaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehiculoCategoria")
public class VehiculoCategoriaController {

    private IVehiculoCategoriaService iVehiculoCategoriaService;

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
