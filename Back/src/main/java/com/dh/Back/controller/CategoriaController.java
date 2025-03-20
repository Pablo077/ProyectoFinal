package com.dh.Back.controller;

import com.dh.Back.entity.Caja;
import com.dh.Back.entity.Categoria;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;

import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    private ICategoriaService iCategoriaService;
    private static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/categorias/";

    @Autowired
    public CategoriaController(ICategoriaService iCategoriaService){
        this.iCategoriaService = iCategoriaService;
    }

    @PostMapping
    public ResponseEntity<Categoria> save(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("mainImage") String mainImage,
            @RequestParam("file") MultipartFile file
    ) throws ResourceNotFoundException {

        // 🔹 4. Crear la carpeta "fotos/marca_modelo/" si no existe
        String uploadDirPath = BASE_UPLOAD_DIR;
        File uploadDir = new File(uploadDirPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        try {
            // 🔹 Guardar la imagen y obtener la ruta
            StringBuilder imagePaths = new StringBuilder();
            String filePath = uploadDirPath + file.getOriginalFilename();
            Path path = Paths.get(filePath);
            file.transferTo(path.toFile());
            imagePaths.append(filePath).append(";");


            Categoria categoria = new Categoria();
            categoria.setNombre(nombre);
            categoria.setMainImage(mainImage);
            categoria.setDescripcion(descripcion);

            return ResponseEntity.ok(iCategoriaService.save(categoria));
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping
    public ResponseEntity<List<Categoria>> findAll(){
        return ResponseEntity.ok(iCategoriaService.findAll());
    }
}
