package com.dh.Back.testIntegracion;

import com.dh.Back.entity.Caracteristica;
import com.dh.Back.entity.Categoria;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.ICategoriaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CategoriaControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ICategoriaService categoriaService;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private Categoria furgoneta;
    private Categoria prueba;

    public void dataLoad() throws ResourceNotFoundException{
        furgoneta = new Categoria("Furgoneta","","");
        prueba = new Categoria("Prueba","","");
    }

    @Test
    @Order(1)
    void save() throws Exception{
        dataLoad();
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                "contenido-imagen".getBytes()
        );

        mockMvc.perform(MockMvcRequestBuilders.multipart("/categoria")
                        .file(file)
                        .param("nombre", "Prueba")
                        .param("descripcion", "Descripción de prueba")
                        .param("mainImage", "imagen.jpg"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        Categoria categoriaGuardada = categoriaService.findAll().stream()
                .filter(caja -> caja.getNombre().equals("Prueba"))
                .findFirst()
                .orElse(null);

        assertNotNull(categoriaGuardada);
        assertEquals("Prueba", categoriaGuardada.getNombre());
    }

    @Test
    @Order(2)
    void findAll() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get("/categoria"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray()) // Asegurarse de que la respuesta es un array
                .andExpect(jsonPath("$.length()").value(categoriaService.findAll().size())) // Verificar el tamaño del array
                .andExpect(jsonPath("$[0].nombre").value("Furgoneta")); // Verificar propiedades del primer elemento
    }

    @Test
    @Order(3)
    void delete() throws Exception{
        Optional<Categoria> existingCategoria = categoriaService.findById(7L);
        assertTrue(existingCategoria.isPresent(), "Categoria con ID 1 debe existir antes de ser eliminada");

        mockMvc.perform(MockMvcRequestBuilders.delete("/categoria/{id}", 7L))
                .andExpect(status().isOk())
                .andExpect(content().string("Borrado exitoso"));

        Optional<Categoria> deletedCaracteristica = categoriaService.findById(7L);
        assertTrue(deletedCaracteristica.isEmpty(), "Categoria con ID 1 debe haber sido eliminada");
    }
}