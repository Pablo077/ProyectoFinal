package com.dh.Back.service.impl;
import com.dh.Back.entity.Caja;
import com.dh.Back.entity.Categoria;
import com.dh.Back.entity.Direccion;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IVehiculoRepository;
import com.dh.Back.service.IVehiculoService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dh.Back.service.ICajaService;
import com.dh.Back.service.IDireccionService;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService implements IVehiculoService {
    /*
    private static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/src/main/resources/static/fotos/";
    */
    private static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/fotos/";
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

    @Override
    public Optional<Vehiculo> findById(Long id) {
        return vehiculoRepository.findById(id);
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        Optional<Vehiculo> vehiculoFindById = findById(id);

        if (vehiculoFindById.isPresent()) {
            String marca = vehiculoFindById.get().getMarca();
            String modelo = vehiculoFindById.get().getModelo();
            String sanitizedFolderName = (marca + "_" + modelo).replaceAll("[^a-zA-Z0-9_]", "_");
            String deleteDirPath = BASE_UPLOAD_DIR + sanitizedFolderName + "/";
            File deleteDir = new File(deleteDirPath);

            if (deleteDir.exists()) {
                deleteFolder(deleteDir);
            }

            vehiculoRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("No se pudo eliminar el vehículo con id: " + id);
        }
    }

    @Override
    public Vehiculo update(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public boolean deleteFolder(File folder) {
        if (folder.exists()) {
            File[] files = folder.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isDirectory()) {
                        deleteFolder(file);
                    } else {
                        file.delete();
                    }
                }
            }
            return folder.delete();
        }
        return false;
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

        Categoria furgoneta = new Categoria();
        furgoneta.setId(1L);
        furgoneta.setNombre("Furgoneta");

        Categoria hatchbackCompacto = new Categoria();
        hatchbackCompacto.setId(2L);
        hatchbackCompacto.setNombre("Hatchback compacto");

        Categoria hatchbackSubcompacto = new Categoria();
        hatchbackSubcompacto.setId(3L);
        hatchbackSubcompacto.setNombre("Hatchback subcompacto");

        Categoria pickUp = new Categoria();
        pickUp.setId(4L);
        pickUp.setNombre("Pick-up mediano");

        Categoria sedan = new Categoria();
        sedan.setId(5L);
        sedan.setNombre("Sedán compacto");

        Categoria suv = new Categoria();
        suv.setId(6L);
        suv.setNombre("SUV");

        vehiculoRepository.save(
                new Vehiculo("Citroen", "C3", 1.5f,5, 1, 2, caja1,
                        direccion, hatchbackCompacto,"Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Citroen", "C3 Aircross", 1.2f,5, 2, 4, caja1,
                        direccion, suv,"Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Fiat", "Cronos Atractive", 1.3f,5, 1, 2, caja2,
                        direccion, sedan,"Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Fiat", "Cronos Drive", 1.3f,5, 1, 2, caja1,
                        direccion, sedan,"Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Ford", "Territory Titanium", 1.8f,5, 1, 2, caja1,
                        direccion, suv,"Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Nissan", "Frontier S 4x4", 2.3f,5, 2, 4, caja1,
                        direccion, pickUp,"Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Toyota", "Etios 5P", 1.5f,5, 1, 2, caja2,
                        direccion, sedan,"Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Toyota", "Yaris", 1.5f,5, 2, 4, caja2,
                        direccion, hatchbackSubcompacto,"Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Toyota", "Hiace", 2.5f,9, 2, 4, caja1,
                        direccion, furgoneta,"Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));

        vehiculoRepository.save(
                new Vehiculo("Volkswagen", "Taos", 1.4f,5, 1, 2, caja1,
                        direccion, suv,"Foto1.png",
                        "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"));



    }



}
