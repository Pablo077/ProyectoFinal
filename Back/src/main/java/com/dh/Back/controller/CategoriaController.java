package com.dh.Back.controller;

import com.dh.Back.entity.Caja;
import com.dh.Back.entity.Categoria;
import com.dh.Back.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    private ICategoriaService iCategoriaService;

    @Autowired
    public CategoriaController(ICategoriaService iCategoriaService){
        this.iCategoriaService = iCategoriaService;
    }

    @PostMapping
    public ResponseEntity<Caja> save(@RequestBody Caja caja){
        try{
            return ResponseEntity.ok(iCategoriaService.save(caja));
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping
    public ResponseEntity<List<Categoria>> findAll(){
        return ResponseEntity.ok(iCategoriaService.findAll());
    }
}
