package com.dh.Back.controller;

import com.dh.Back.entity.Caja;
import com.dh.Back.service.ICajaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.log4j.Logger;

import java.util.List;

@RestController
@RequestMapping("/caja")
public class CajaController {

    private ICajaService iCajaService;
    private static final Logger LOGGER = Logger.getLogger(DireccionController.class);

    @Autowired
    public CajaController(ICajaService iCajaService) {
        this.iCajaService = iCajaService;
    }

    @PostMapping
    public ResponseEntity<Caja> save(@RequestBody Caja caja){
        try{
            return ResponseEntity.ok(iCajaService.save(caja));
        }catch (Exception e){
            System.out.println(e);
            LOGGER.warn(e);
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping
    public ResponseEntity<List<Caja>> findAll(){return ResponseEntity.ok(iCajaService.findAll());}


}
