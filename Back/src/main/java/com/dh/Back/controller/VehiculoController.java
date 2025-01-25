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

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vehiculo")
public class VehiculoController {
    private static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/fotos/"; // Carpeta base de fotos

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
    public ResponseEntity<String> save(
            @RequestParam("marca") String marca,
            @RequestParam("modelo") String modelo,
            @RequestParam("pasajeros") Integer pasajeros,
            @RequestParam("valijasGrandes") Integer valijasGrandes,
            @RequestParam("valijasChicas") Integer valijasChicas,
            @RequestParam("caja_id") Long caja_id,
            @RequestParam("direccion_id") Long direccion_id,
            @RequestParam("images") MultipartFile[] files,
            @RequestParam("mainImage") String mainImage,
            @RequestParam("filesName") String filesName

    ) {
        ResponseEntity<String> response;
        try {



            // Buscar Caja y Direccion en la BD
            Optional<Caja> cajaOptional = cajaService.findById(caja_id);
            Optional<Direccion> direccionOptional = direccionService.findById(direccion_id);



            if (cajaOptional.isEmpty() || direccionOptional.isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }

            Caja caja = cajaOptional.get();
            Direccion direccion = direccionOptional.get();

            // Crear objeto Vehiculo
            Vehiculo vehiculo = new Vehiculo();
            vehiculo.setMarca(marca);
            vehiculo.setModelo(modelo);
            vehiculo.setPasajeros(pasajeros);
            vehiculo.setValijasGrandes(valijasGrandes);
            vehiculo.setValijasChicas(valijasChicas);
            vehiculo.setCaja(caja);
            vehiculo.setDireccion(direccion);
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
                String filePath = BASE_UPLOAD_DIR + file.getOriginalFilename();
                Path path = Paths.get(filePath);
                file.transferTo(path.toFile());
                imagePaths.append(filePath).append(";");
            }

            // Guardar en BD
            vehiculoService.save(vehiculo);
            response = ResponseEntity.status(200).body("Vehículo guardado correctamente");
            return response;

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }
    }






    @GetMapping
    public ResponseEntity<List<Vehiculo>> findAll() {
        List<Vehiculo> vehiculos = vehiculoService.findAll();

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
