package com.dh.Back.service.impl;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IVehiculoRepository;
import com.dh.Back.service.IVehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehiculoService implements IVehiculoService {

    private static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/fotos/";

    //Usar en el test
    //private static final String BASE_UPLOAD_DIR = "test-uploads/";

    private IVehiculoRepository vehiculoRepository;

    @Autowired
    public VehiculoService(IVehiculoRepository vehiculoRepository){
        this.vehiculoRepository = vehiculoRepository;
    }

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

    @Override
    public List<String> getMarcas() {
        return vehiculoRepository.findAll().stream()
                .map(Vehiculo::getMarca)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getModelosByMarca(String marca) {
        return vehiculoRepository.findModelosByMarca(marca);
    }

    @Override
    public List<Vehiculo> buscarVehiculosDisponibles(String marca, String modelo, Integer pasajeros) {
        // Buscar vehículos según los criterios
        List<Vehiculo> vehiculos = vehiculoRepository.buscarPorCriterios(marca, modelo, pasajeros);

        return vehiculos;

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

}
