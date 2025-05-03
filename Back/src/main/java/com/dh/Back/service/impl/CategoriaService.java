package com.dh.Back.service.impl;

import com.dh.Back.entity.Categoria;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.ICategoriaRepository;
import com.dh.Back.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService implements ICategoriaService {

    private ICategoriaRepository categoriaRepository;

    //Usar en el test
    private static final String BASE_UPLOAD_DIR = "test-uploads/";

    //private static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/categorias/";

    @Autowired
    public CategoriaService(ICategoriaRepository categoriaRepository){
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public Categoria save(Categoria categoria) throws ResourceNotFoundException
    {
        try{
            return categoriaRepository.save(categoria);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    @Override
    public Optional<Categoria> findById(Long id) {
        return categoriaRepository.findById(id);
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        Optional<Categoria> categoriaFindById = findById(id);

        if(categoriaFindById.isPresent()){
            String deleteDirPath = BASE_UPLOAD_DIR + "/" + categoriaFindById.get().getMainImage();
            File deleteDir = new File(deleteDirPath);

            if (deleteDir.exists()) {
                deleteFolder(deleteDir);
            }
            categoriaRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("No se pudo eliminar la categoría con id: " + id);

        }
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
