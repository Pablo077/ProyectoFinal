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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class FavoritoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IFavoritoService favoritoService;

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
    private User user;
    private Favorito prueba;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void dataLoad() throws ResourceNotFoundException {
        automatico = new Caja("Automático");
        asistido = new Direccion("Asistido");
        hatchbackCompacto = new Categoria("Hatchback compacto", "", "");
        user = new User(2L, "Pedro", "Diaz", "user@gmail.com", "1234", Role.USER);

        // Save the related entities first
        cajaService.save(automatico);
        direccionService.save(asistido);
        categoriaService.save(hatchbackCompacto);

        vehiculo = new Vehiculo("Citroen", "C3", 1.5f,5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        prueba = new Favorito(user, vehiculo);
    }

    @Test
    @Order(2)
    void save() throws Exception{
        dataLoad();
        vehiculoService.save(vehiculo);

        String favoritoJson = objectMapper.writeValueAsString(prueba);

        mockMvc.perform(MockMvcRequestBuilders.post("/favorito")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(favoritoJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        Favorito favoritoGuardada = favoritoService.findAll().stream()
                .filter(marca -> marca.getVehiculo().getMarca().equals("Citroen"))
                .findFirst()
                .orElse(null);

        assertNotNull(favoritoGuardada);
        assertEquals("Citroen", favoritoGuardada.getVehiculo().getMarca());

    }

    @Test
    @Order(1)
    void findByUser() throws Exception{
        dataLoad();

        // Convertimos el user en JSON para mandarlo como body
        String userJson = objectMapper.writeValueAsString(user);

        mockMvc.perform(MockMvcRequestBuilders.post("/favorito/FavoritoUser")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(result -> {
                    String jsonResponse = result.getResponse().getContentAsString();
                    assertTrue(jsonResponse.contains("Citroen"));
                });
    }

    @Test
    @Order(3)
    void delete() throws Exception{
        Optional<Favorito> existingFavorito = favoritoService.findById(1L);
        assertTrue(existingFavorito.isPresent(), "Favorito con ID 1 debe existir antes de ser eliminada");

        mockMvc.perform(MockMvcRequestBuilders.delete("/favorito/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(content().string("Borrado exitoso"));

        Optional<Favorito> deletedFavorito = favoritoService.findById(1L);
        assertTrue(deletedFavorito.isEmpty(), "Favorito con ID 1 debe haber sido eliminada");
    }
}