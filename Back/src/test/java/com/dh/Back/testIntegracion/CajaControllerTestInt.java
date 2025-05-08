package com.dh.Back.testIntegracion;

import com.dh.Back.entity.Caja;
import com.dh.Back.service.ICajaService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CajaControllerTestInt {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ICajaService cajaService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @Order(2)
    public void save() throws Exception{
        Caja nuevaCaja = new Caja("Electrónico");

        String cajaJson = objectMapper.writeValueAsString(nuevaCaja);


        mockMvc.perform(MockMvcRequestBuilders.post("/caja")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(cajaJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));


        Caja cajaGuardada = cajaService.findAll().stream()
                .filter(caja -> caja.getTipo().equals("Electrónico"))
                .findFirst()
                .orElse(null);

        assertNotNull(cajaGuardada);
        assertEquals("Electrónico", cajaGuardada.getTipo());
    }

    @Test
    @Order(1)
    public void findAll() throws Exception{
        mockMvc.perform(get("/caja"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("[{\"id\":1,\"tipo\":\"Automático\"},{\"id\":2,\"tipo\":\"Manual\"},{\"id\":3,\"tipo\":\"Semiautomático\"}]"));
    }
}