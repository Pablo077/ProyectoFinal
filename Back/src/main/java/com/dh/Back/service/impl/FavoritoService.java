package com.dh.Back.service.impl;

import com.dh.Back.entity.Favorito;
import com.dh.Back.entity.User;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IFavoritoRepository;
import com.dh.Back.service.IFavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoritoService implements IFavoritoService {
    private IFavoritoRepository favoritoRepository;

    @Autowired
    public FavoritoService(IFavoritoRepository favoritoRepository){
        this.favoritoRepository = favoritoRepository;
    }

    @Override
    public Favorito save(Favorito favorito) throws ResourceNotFoundException {
        try{
            return favoritoRepository.save(favorito);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public List<Favorito> findByUser(User user) {
        return favoritoRepository.findByUser(user.getId());
    }

    @Override
    public List<Favorito> findAll() {
        return favoritoRepository.findAll();
    }

    @Override
    public Optional<Favorito> findById(Long id) {
        return favoritoRepository.findById(id);
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        Optional<Favorito> favoritoFindById = findById(id);

        if(favoritoFindById.isPresent()){
            favoritoRepository.deleteById(favoritoFindById.get().getId());
        }
        else{
            throw new ResourceNotFoundException("No se pudo eliminar el favorito con id: " + id);
        }
    }


}
