package com.dh.Back.controller;


import com.dh.Back.entity.Favorito;
import com.dh.Back.entity.User;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.IFavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/favorito")
public class FavoritoController {

    private IFavoritoService iFavoritoService;

    @Autowired
    public FavoritoController(IFavoritoService iFavoritoService){
        this.iFavoritoService = iFavoritoService;
    }

    @PostMapping
    public ResponseEntity<Favorito> save(@RequestBody Favorito favorito) throws ResourceNotFoundException{
        System.out.println(favorito);
        return ResponseEntity.ok(iFavoritoService.save(favorito));
    }

    @PostMapping("/FavoritoUser")
    public ResponseEntity<List<Favorito>> findByUser(@RequestBody User user){
        return ResponseEntity.ok(iFavoritoService.findByUser(user));
    }
}
