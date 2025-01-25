package com.dh.Back.service.impl;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.repository.IVehiculoRepository;
import com.dh.Back.service.IVehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService implements IVehiculoService {

    private IVehiculoRepository vehiculoRepository;

    @Autowired
    public VehiculoService(IVehiculoRepository vehiculoRepository){this.vehiculoRepository = vehiculoRepository;}

    @Override
    public Vehiculo save(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    @Override
    public List<Vehiculo> findAll() {
        return vehiculoRepository.findAll();
    }

    @Override
    public Optional<Vehiculo> findByMarcaAndModelo(String marca, String modelo) {
        return vehiculoRepository.findByMarcaAndModelo(marca, modelo);
    }
}
