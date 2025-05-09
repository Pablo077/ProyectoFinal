package com.dh.Back.testIntegracion;

import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.ICajaService;
import com.dh.Back.service.ICategoriaService;
import com.dh.Back.service.IDireccionService;
import com.dh.Back.service.IVehiculoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import static org.mockito.Mockito.*;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.hamcrest.Matchers;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class VehiculoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IVehiculoService vehiculoService;

    @Autowired
    private ICajaService cajaService;

    @Autowired
    private IDireccionService direccionService;

    @Autowired
    private ICategoriaService categoriaService;

    private Vehiculo vehiculo;
    private Caja automatico;
    private Direccion asistido;
    private Categoria hatchbackCompacto;

    private static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/fotos/";

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void dataLoad() throws ResourceNotFoundException {
        automatico = new Caja("Automático");
        asistido = new Direccion("Asistido");
        hatchbackCompacto = new Categoria("Hatchback compacto", "", "");

        cajaService.save(automatico);
        direccionService.save(asistido);
        categoriaService.save(hatchbackCompacto);

        vehiculo = new Vehiculo("Citroen", "C3", 1.5f,5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");

    }

    @Test
    void save() throws Exception{
        dataLoad();

        MockMultipartFile file1 = new MockMultipartFile("images", "foto1.jpg", "image/jpeg", "contenido".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("images", "foto2.jpg", "image/jpeg", "contenido".getBytes());

        mockMvc.perform(MockMvcRequestBuilders.multipart("/vehiculo")
                        .file(file1)
                        .file(file2)
                        .param("marca", "TestMarca")
                        .param("modelo", "TestModelo")
                        .param("motor", "1.6")
                        .param("pasajeros", "4")
                        .param("valijasGrandes", "2")
                        .param("valijasChicas", "1")
                        .param("caja_id", automatico.getId().toString())
                        .param("direccion_id", asistido.getId().toString())
                        .param("categoria_id", hatchbackCompacto.getId().toString())
                        .param("mainImage", "foto1.jpg")
                        .param("filesName", "{\"images\":[\"foto1.jpg\",\"foto2.jpg\"]}")
                )
                .andExpect(status().isOk())
                .andExpect(content().string("Vehículo guardado correctamente"));
    }

    @Test
    void findAll() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get("/vehiculo/getVehiculos"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(vehiculoService.findAll().size()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[*].modelo").value(Matchers.hasItem("Etios 5P")));
    }


    @Test
    void getFile() throws Exception {
        String folder = "Citroen_C3";
        String filename = "Foto1.png";
        Path filePath = Paths.get(BASE_UPLOAD_DIR).resolve(folder).resolve(filename);

        // Configura el comportamiento esperado si usas mocks
        // Mockito.when(...).thenReturn(...);

        mockMvc.perform(get("/vehiculo/fotos/{folder}/{filename}", folder, filename)
                        .contentType(MediaType.IMAGE_JPEG))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.IMAGE_JPEG));
    }


    @Test
    void delete() throws Exception{
        dataLoad();

        MockMultipartFile file1 = new MockMultipartFile("images", "foto1.jpg", "image/jpeg", "contenido".getBytes());
        MockMultipartFile file2 = new MockMultipartFile("images", "foto2.jpg", "image/jpeg", "contenido".getBytes());

        mockMvc.perform(MockMvcRequestBuilders.multipart("/vehiculo")
                        .file(file1)
                        .file(file2)
                        .param("marca", "TestMarca")
                        .param("modelo", "TestModelo")
                        .param("motor", "1.6")
                        .param("pasajeros", "4")
                        .param("valijasGrandes", "2")
                        .param("valijasChicas", "1")
                        .param("caja_id", automatico.getId().toString())
                        .param("direccion_id", asistido.getId().toString())
                        .param("categoria_id", hatchbackCompacto.getId().toString())
                        .param("mainImage", "foto1.jpg")
                        .param("filesName", "{\"images\":[\"foto1.jpg\",\"foto2.jpg\"]}")
                )
                .andExpect(status().isOk())
                .andExpect(content().string("Vehículo guardado correctamente"));


        Long vehiculoId = vehiculoService.findAll().stream()
                .filter(v -> v.getMarca().equals("TestMarca") && v.getModelo().equals("TestModelo"))
                .findFirst()
                .map(Vehiculo::getId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado"));


        mockMvc.perform(MockMvcRequestBuilders.delete("/vehiculo/{id}", vehiculoId))
                .andExpect(status().isOk())  // Verificar que la respuesta sea 200 OK
                .andExpect(content().string("Borrado exitoso"));  // Verificar que el mensaje de éxito sea el esperado


        mockMvc.perform(MockMvcRequestBuilders.get("/vehiculo/getVehiculos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[*].id").value(Matchers.not(Matchers.hasItem(vehiculoId))));  // Verificar que el ID del vehículo eliminado no esté en la respuesta
    }

    @Test
    void update() throws Exception{
        // Crear un objeto Vehiculo con los datos que deseas actualizar
        Vehiculo vehiculo = new Vehiculo();
        vehiculo.setId(1L);
        vehiculo.setMarca("Toyota");
        vehiculo.setModelo("Corolla");


        // Convertir el objeto Vehiculo a JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String vehiculoJson = objectMapper.writeValueAsString(vehiculo);

        // Realizar la solicitud PUT y verificar la respuesta
        mockMvc.perform(MockMvcRequestBuilders.put("/vehiculo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(vehiculoJson))
                .andExpect(MockMvcResultMatchers.status().isOk())  // Verificar que la respuesta sea 200 OK
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.marca").value("Toyota"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.modelo").value("Corolla"));

    }

    @Test
    void getMarcas() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get("/vehiculo/getMarcas")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[*]").value(Matchers.hasItem("Toyota")));
    }

    @Test
    void getModelos() throws Exception{
        String marca = "Toyota";
        mockMvc.perform(MockMvcRequestBuilders.get("/vehiculo/getModelos/{marca}", marca)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())  // Ensure the response is an array
                .andExpect(MockMvcResultMatchers.jsonPath("$[*]").value(Matchers.hasItem("Etios 5P")));  // Check if "Etios 5P" is in the array
    }
}