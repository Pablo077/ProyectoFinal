package com.dh.Back.controller;

import com.dh.Back.entity.Caja;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.ICajaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/caja")
public class CajaController {

    private ICajaService iCajaService;


    @Autowired
    public CajaController(ICajaService iCajaService) {
        this.iCajaService = iCajaService;
    }

    @PostMapping
    public ResponseEntity<Caja> save(@RequestBody Caja caja) throws ResourceNotFoundException {
        return ResponseEntity.ok(iCajaService.save(caja));
    }

    @GetMapping
    public ResponseEntity<List<Caja>> findAll(){return ResponseEntity.ok(iCajaService.findAll());}


}
