package com.dh.Back.controller;

import com.dh.Back.entity.Caja;
import com.dh.Back.entity.Direccion;
import com.dh.Back.entity.Vehiculo;
import com.dh.Back.service.IVehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.dh.Back.service.ICajaService;
import com.dh.Back.service.IDireccionService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/vehiculo")
public class VehiculoController {
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/"; // Ruta dentro del proyecto

    private IVehiculoService vehiculoService;
    private ICajaService cajaService;
    private IDireccionService direccionService;

    @Autowired
    public VehiculoController(
            IVehiculoService vehiculoService,
            ICajaService cajaService,
            IDireccionService direccionService
            ) {
        this.vehiculoService = vehiculoService;
        this.cajaService = cajaService;
        this.direccionService = direccionService;
    }

    @PostMapping
    public ResponseEntity<Vehiculo> save(
            @RequestParam("marca") String marca,
            @RequestParam("modelo") String modelo,
            @RequestParam("pasajeros") Integer pasajeros,
            @RequestParam("valijasGrandes") Integer valijasGrandes,
            @RequestParam("valijasChicas") Integer valijasChicas,
            @RequestParam("caja_id") Long caja_id,
            @RequestParam("direccion_id") Long direccion_id,
            //@RequestParam("mainImageIndex") Integer mainImageIndex,
            @RequestParam("images") MultipartFile[] files
    ) {

        try {

            // Buscar Caja y Direccion en la BD
            Optional<Caja> cajaOptional = cajaService.findById(caja_id);
            Optional<Direccion> direccionOptional = direccionService.findById(direccion_id);



            if (cajaOptional.isEmpty() || direccionOptional.isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }

            Caja caja = cajaOptional.get();
            Direccion direccion = direccionOptional.get();

            // Crear la carpeta si no existe
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Guardar imágenes y obtener las rutas
            StringBuilder imagePaths = new StringBuilder();
            for (MultipartFile file : files) {
                String filePath = UPLOAD_DIR + file.getOriginalFilename();
                Path path = Paths.get(filePath);
                file.transferTo(path.toFile());
                imagePaths.append(filePath).append(";");
            }

            // Crear objeto Vehiculo
            Vehiculo vehiculo = new Vehiculo();
            vehiculo.setMarca(marca);
            vehiculo.setModelo(modelo);
            vehiculo.setPasajeros(pasajeros);
            vehiculo.setValijasGrandes(valijasGrandes);
            vehiculo.setValijasChicas(valijasChicas);
            vehiculo.setCaja(caja);
            vehiculo.setDireccion(direccion);
            //vehiculo.setImagenes(imagePaths.toString()); // Guardar rutas en la BD

            // Guardar en BD
            return ResponseEntity.ok(vehiculoService.save(vehiculo));

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Vehiculo>> findAll() {
        List<Vehiculo> vehiculos = vehiculoService.findAll();

        System.out.println(vehiculos); // Verifica en la consola

        if (vehiculos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(vehiculos);
    }

    /*
    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get(System.getProperty("user.home") + "/Desktop/uploads/").resolve(filename);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Cambia según el tipo de imagen (PNG, GIF, etc.)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    */

}
