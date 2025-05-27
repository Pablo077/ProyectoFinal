package com.dh.Back.testIntegracion;

import com.dh.Back.authentication.AuthenticationResponse;
import com.dh.Back.authentication.AuthenticationUpdate;
import com.dh.Back.authentication.RegisterRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.*;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AuthenticationControllerTest {
    @Autowired
    private MockMvc mockMvc;


    private RegisterRequest registerRequest;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void dataLoad(){
        // Arrange
        registerRequest = new RegisterRequest();
        registerRequest.setFirstname("Integration");
        registerRequest.setLastname("Test");
        registerRequest.setEmail("integration.test@example.com");
        registerRequest.setPassword("password123");
        // FIX: Set a value for idrol
        registerRequest.setIdrol(1); // Assuming 1 is a valid role ID for a standard user registration
    }

    @Test
    @Order(1)
    void register() throws Exception{
        dataLoad();
        // Convert the request object to JSON
        String requestJson = objectMapper.writeValueAsString(registerRequest);

        // Act
        MvcResult result = mockMvc.perform(post("/auth/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andReturn();

    }

    @Test
    @Order(2)
    void login() throws Exception{
        dataLoad();
        // Convert the request object to JSON
        String requestJson = objectMapper.writeValueAsString(registerRequest);

        // Act
        MvcResult result = mockMvc.perform(post("/auth/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andReturn();
        // Assert
        String responseJson = result.getResponse().getContentAsString();
        AuthenticationResponse authResponse = objectMapper.readValue(responseJson, AuthenticationResponse.class);
        assertNotNull(authResponse);
        assertEquals("Integration", authResponse.getFirstname());

    }

    @Test
    @Order(3)
    void listAllUser() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get("/auth/listUsers"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[?(@.firstname == 'Juan')]").exists());

    }

    @Test
    @Order(4)
    void updateUser() throws Exception{
        // Crear un objeto AuthenticationUpdate con los datos a modificar
        AuthenticationUpdate updateRequest = new AuthenticationUpdate();
        updateRequest.setId(1L); // ID del usuario que querés modificar
        updateRequest.setFirstname("Juan Modificado");
        updateRequest.setLastname("Apellido Original");
        updateRequest.setEmail("usuario1@example.com"); // Asegurate que este email sea correcto
        updateRequest.setPassword("password123"); // Si es necesario enviarlo
        updateRequest.setRol("ADMIN");

        // Convertir a JSON
        String requestJson = objectMapper.writeValueAsString(updateRequest);

        // Hacer el PUT al endpoint
        mockMvc.perform(put("/auth/updateUser")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk());

        // Verificar que se actualizó correctamente
        mockMvc.perform(get("/auth/listUsers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.id == 1 && @.firstname == 'Juan Modificado')]").exists());
    }
}