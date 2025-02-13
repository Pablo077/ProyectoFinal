package com.dh.Back.controller;
import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.ICategoriaService;
import com.dh.Back.service.IVehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.dh.Back.service.ICajaService;
import com.dh.Back.service.IDireccionService;
import org.apache.log4j.Logger;
import java.util.Collections;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;


@RestController
@RequestMapping("/vehiculo")
public class VehiculoController {
    /*
     private static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/src/main/resources/static/fotos/";
     */
    private static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/fotos/";

    private IVehiculoService vehiculoService;
    private ICajaService cajaService;
    private IDireccionService direccionService;
    private ICategoriaService categoriaService;
    private static final Logger LOGGER = Logger.getLogger(VehiculoController.class);

    @Autowired
    public VehiculoController(
            IVehiculoService vehiculoService,
            ICajaService cajaService,
            IDireccionService direccionService,
            ICategoriaService categoriaService
            ) {
        this.vehiculoService = vehiculoService;
        this.cajaService = cajaService;
        this.direccionService = direccionService;
        this.categoriaService = categoriaService;
    }

    @PostMapping
    public ResponseEntity<String> save(
            @RequestParam("marca") String marca,
            @RequestParam("modelo") String modelo,
            @RequestParam("motor") Float motor,
            @RequestParam("pasajeros") Integer pasajeros,
            @RequestParam("valijasGrandes") Integer valijasGrandes,
            @RequestParam("valijasChicas") Integer valijasChicas,
            @RequestParam("caja_id") Long caja_id,
            @RequestParam("direccion_id") Long direccion_id,
            @RequestParam("images") MultipartFile[] files,
            @RequestParam("mainImage") String mainImage,
            @RequestParam("filesName") String filesName,
            @RequestParam("categoria_id") Long categoria_id


    ) {
        ResponseEntity<String> response;

        try {
            // Buscar Caja y Direccion en la BD
            Optional<Caja> cajaOptional = cajaService.findById(caja_id);
            Optional<Direccion> direccionOptional = direccionService.findById(direccion_id);
            Optional<Categoria> categoriaOptional = categoriaService.findById(categoria_id);

            if (cajaOptional.isEmpty() || direccionOptional.isEmpty() || categoriaOptional.isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }

            Caja caja = cajaOptional.get();
            Direccion direccion = direccionOptional.get();
            Categoria categoria = categoriaOptional.get();

            // Crear objeto Vehiculo
            Vehiculo vehiculo = new Vehiculo();
            vehiculo.setMarca(marca);
            vehiculo.setModelo(modelo);
            vehiculo.setMotor(motor);
            vehiculo.setPasajeros(pasajeros);
            vehiculo.setValijasGrandes(valijasGrandes);
            vehiculo.setValijasChicas(valijasChicas);
            vehiculo.setCaja(caja);
            vehiculo.setDireccion(direccion);
            vehiculo.setCategoria(categoria);
            vehiculo.setMainImage(mainImage);
            vehiculo.setFilesName(filesName);

            Optional<Vehiculo> existingVehiculo = vehiculoService.findByMarcaAndModelo(marca, modelo);
            if (existingVehiculo.isPresent()) {
                return ResponseEntity.status(200).body("El vehículo ya existe");
            }

            // 🔹 4. Crear la carpeta "fotos/marca_modelo/" si no existe
            String sanitizedFolderName = (marca + "_" + modelo).replaceAll("[^a-zA-Z0-9_]", "_");
            String uploadDirPath = BASE_UPLOAD_DIR + sanitizedFolderName + "/";
            File uploadDir = new File(uploadDirPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Guardar imágenes y obtener las rutas
            StringBuilder imagePaths = new StringBuilder();
            for (MultipartFile file : files) {
                String filePath = uploadDirPath + file.getOriginalFilename();
                Path path = Paths.get(filePath);
                file.transferTo(path.toFile());
                imagePaths.append(filePath).append(";");
            }

            // Guardar en BD
            vehiculoService.save(vehiculo);
            response = ResponseEntity.status(200).body("Vehículo guardado correctamente");
            return response;

        } catch (Exception e) {
            LOGGER.warn("Error: " + e);
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getVehiculos")
    public ResponseEntity<List<Vehiculo>> findAll() {
        List<Vehiculo> vehiculos = vehiculoService.findAll();
        Collections.shuffle(vehiculos);

        if (vehiculos.isEmpty()) {
            LOGGER.info("Vehículos está vacío");
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/fotos/{folder}/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String folder, @PathVariable String filename) {
        try {
            Path filePath = Paths.get(BASE_UPLOAD_DIR).resolve(folder).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)  // Cambia según el tipo de imagen
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws ResourceNotFoundException {
        vehiculoService.delete(id);
        return ResponseEntity.ok("Borrado exitoso");
    }

    @PutMapping
    public ResponseEntity<Vehiculo> update(@RequestBody Vehiculo vehiculo) {
        return ResponseEntity.ok(vehiculoService.update(vehiculo));
    }

}
