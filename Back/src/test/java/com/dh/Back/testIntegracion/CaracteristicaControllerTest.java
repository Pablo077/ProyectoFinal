package com.dh.Back.testIntegracion;

import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

class CaracteristicaControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ICaracteristicaService caracteristicaService;

    @Autowired
    private IVehiculoService vehiculoService;

    @Autowired
    private ICajaService cajaService; // Inject CajaService

    @Autowired
    private IDireccionService direccionService; // Inject DireccionService

    @Autowired
    private ICategoriaService categoriaService; // Inject CategoriaService

    private Vehiculo vehiculo1;
    private Caja automatico;
    private Direccion asistido;
    private Categoria hatchbackCompacto;
    private Caracteristica caracteristica1;

    private final ObjectMapper objectMapper = new ObjectMapper();


    public void dataLoad() throws ResourceNotFoundException {
        automatico = new Caja("Automático");
        asistido = new Direccion("Asistido");
        hatchbackCompacto = new Categoria("Hatchback compacto", "", "");

        // Save the related entities first
        cajaService.save(automatico);
        direccionService.save(asistido);
        categoriaService.save(hatchbackCompacto);

        vehiculo1 = new Vehiculo("Citroen", "C3", 1.5f,5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        vehiculo1.setId(1L);
        caracteristica1 = new Caracteristica("Prueba", 1, vehiculo1);
        caracteristica1.setId(1L);
    }

    @Test
    @Order(1)
    void save() throws Exception{
        dataLoad();
        vehiculoService.save(vehiculo1);

        String caracteristicaJson = objectMapper.writeValueAsString(caracteristica1);

        mockMvc.perform(MockMvcRequestBuilders.post("/caracteristica")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(caracteristicaJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        Caracteristica caracteristicaGuardada = caracteristicaService.findAll().stream()
                .filter(caja -> caja.getNombre().equals("Prueba"))
                .findFirst()
                .orElse(null);

        assertNotNull(caracteristicaGuardada);
        assertEquals("Prueba", caracteristicaGuardada.getNombre());
    }

    @Test
    @Order(2)
    void findAll() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get("/caracteristica"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray()) // Asegurarse de que la respuesta es un array
                .andExpect(jsonPath("$.length()").value(caracteristicaService.findAll().size())) // Verificar el tamaño del array
                .andExpect(jsonPath("$[0].nombre").value("Prueba")) // Verificar propiedades del primer elemento
                .andExpect(jsonPath("$[0].icono").value(1))
                .andExpect(jsonPath("$[0].vehiculo.modelo").value("C3")); // Verificar relación con Vehiculo
    }

    @Test
    @Order(3)
    void findByVehiculo() throws Exception{
        dataLoad();

        ObjectMapper objectMapper = new ObjectMapper();
        String vehiculoJson = objectMapper.writeValueAsString(vehiculo1);

        mockMvc.perform(MockMvcRequestBuilders.post("/caracteristica/caracteristicaVehiculo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(vehiculoJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].nombre").value("Prueba"));
    }

    @Test
    @Order(4)
    void update() throws Exception{
        dataLoad();

        Caracteristica caracteristicaActualizada = new Caracteristica("Actualizado",2, vehiculo1);
        caracteristicaActualizada.setId(1L);

        ObjectMapper objectMapper = new ObjectMapper();
        String caracteristicaJson = objectMapper.writeValueAsString(caracteristicaActualizada);

        mockMvc.perform(MockMvcRequestBuilders.put("/caracteristica")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(caracteristicaJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                // 5. Verificar el contenido de la respuesta JSON
                .andExpect(jsonPath("$.nombre").value("Actualizado"));

    }

    @Test
    @Order(5)
    void delete() throws Exception {
        Optional<Caracteristica> existingCaracteristica = caracteristicaService.findById(1L);
        assertTrue(existingCaracteristica.isPresent(), "Caracteristica con ID 1 debe existir antes de ser eliminada");

        mockMvc.perform(MockMvcRequestBuilders.delete("/caracteristica/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(content().string("Borrado exitoso"));

        Optional<Caracteristica> deletedCaracteristica = caracteristicaService.findById(1L);
        assertTrue(deletedCaracteristica.isEmpty(), "Caracteristica con ID 1 debe haber sido eliminada");
    }

}