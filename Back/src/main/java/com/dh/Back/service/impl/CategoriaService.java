package com.dh.Back.service.impl;


import com.dh.Back.entity.Categoria;
import com.dh.Back.entity.Role;
import com.dh.Back.entity.User;
import com.dh.Back.repository.ICategoriaRepository;
import com.dh.Back.service.ICategoriaService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService implements ICategoriaService {

    private ICategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(ICategoriaRepository categoriaRepository){
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    @Override
    public Optional<Categoria> findById(Long id) {
        return categoriaRepository.findById(id);
    }


    @PostConstruct
    public void initData() {
        if (categoriaRepository.count() > 0) {
           return;
        }

        categoriaRepository.save(new Categoria("Furgoneta"));
        categoriaRepository.save(new Categoria("Hatchback compacto"));
        categoriaRepository.save(new Categoria("Hatchback subcompacto"));
        categoriaRepository.save(new Categoria("Pick-up mediano"));
        categoriaRepository.save(new Categoria("Sedán compacto"));
        categoriaRepository.save(new Categoria("SUV"));

    }


}
