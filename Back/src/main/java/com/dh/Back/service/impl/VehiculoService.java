package com.dh.Back.service.impl;
import com.dh.Back.entity.Caja;
import com.dh.Back.entity.Direccion;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.repository.IVehiculoRepository;
import com.dh.Back.service.IVehiculoService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dh.Back.service.ICajaService;
import com.dh.Back.service.IDireccionService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService implements IVehiculoService {

    private IVehiculoRepository vehiculoRepository;
    private ICajaService cajaService;
    private IDireccionService direccionService;

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

    @PostConstruct
    public void initData() {
        if (vehiculoRepository.count() > 0) {
            return;
        }

        Caja caja1 = new Caja();
        caja1.setId(1L);
        caja1.setTipo("Automatico");

        Caja caja2 = new Caja();
        caja2.setId(2L);
        caja2.setTipo("Manual");

        Direccion direccion = new Direccion();
        direccion.setId(1L);
        direccion.setTipo("Asistido");

        vehiculoRepository.save(
                new Vehiculo("Citroen", "C3", 1.5f,5, 1, 2, caja1,
                        direccion, "Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Citroen", "C3 Aircross", 1.2f,5, 2, 4, caja1,
                        direccion, "Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Fiat", "Cronos Atractive", 1.3f,5, 1, 2, caja2,
                        direccion, "Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Fiat", "Cronos Drive", 1.3f,5, 1, 2, caja1,
                        direccion, "Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Ford", "Territory Titanium", 1.8f,5, 1, 2, caja1,
                        direccion, "Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Nissan", "Frontier S 4x4", 2.3f,5, 2, 4, caja1,
                        direccion, "Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Toyota", "Etios 5P", 1.5f,5, 1, 2, caja2,
                        direccion, "Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Toyota", "Yaris", 1.5f,5, 2, 4, caja2,
                        direccion, "Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Toyota", "Hiace", 2.5f,9, 2, 4, caja1,
                        direccion, "Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Volkswagen", "Taos", 1.4f,5, 1, 2, caja1,
                        direccion, "Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));



    }



}
