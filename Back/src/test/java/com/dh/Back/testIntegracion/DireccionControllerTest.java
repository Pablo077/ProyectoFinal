package com.dh.Back.testIntegracion;

import com.dh.Back.entity.Direccion;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.IDireccionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class DireccionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IDireccionService direccionService;

    private Direccion prueba;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void dataLoad() throws ResourceNotFoundException{
        prueba = new Direccion("Prueba");
    }

    @Test
    void save() throws Exception{
        dataLoad();

        String direccionJson = objectMapper.writeValueAsString(prueba);

        mockMvc.perform(MockMvcRequestBuilders.post("/direccion")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(direccionJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        Direccion direccionGuardada = direccionService.findAll().stream()
                .filter(result -> result.getTipo().equals("Prueba"))
                .findFirst()
                .orElse(null);

        assertNotNull(direccionGuardada);
        assertEquals("Prueba", direccionGuardada.getTipo());
    }

    @Test
    void findAll() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get("/direccion"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(direccionService.findAll().size()))
                .andExpect(jsonPath("$[0].tipo").value("Asistido"));
    }
}