package com.dh.Back.testIntegracion;

import com.dh.Back.dto.ReservaDTO;
import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

class ReservaControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IReservaService reservaService;

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
    private Reserva reservaPrueba;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void dataLoad() throws ResourceNotFoundException {
        objectMapper.registerModule(new JavaTimeModule());
        automatico = new Caja("Automático");
        asistido = new Direccion("Asistido");
        hatchbackCompacto = new Categoria("Hatchback compacto", "", "");
        user = new User(2L, "Pedro", "Diaz", "user@gmail.com", "1234", Role.USER);

        // Save the related entities first
        cajaService.save(automatico);
        direccionService.save(asistido);
        categoriaService.save(hatchbackCompacto);

        vehiculo = new Vehiculo("Citroen", "C3", 1.5f,5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");

        LocalDate fechaInicio1 = LocalDate.of(2025, 3, 20);
        LocalDate fechaFinal1 = LocalDate.of(2025, 3, 24);
        reservaPrueba = new Reserva(user, vehiculo, fechaInicio1, fechaFinal1);
    }

    @Test
    @Order(1)
    void findAll() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get("/reserva"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray()) // Asegurarse de que la respuesta es un array
                .andExpect(jsonPath("$.length()").value(reservaService.findAll().size())) // Verificar el tamaño del array
                .andExpect(jsonPath("$[0].vehiculo.modelo").value("C3")); // Verificar propiedades del primer elemento
    }

    @Test
    @Order(2)
    void findByVehiculo() throws Exception{
        dataLoad();
        vehiculo.setId(1L);
        ObjectMapper objectMapper = new ObjectMapper();
        String vehiculoJson = objectMapper.writeValueAsString(vehiculo);

        mockMvc.perform(MockMvcRequestBuilders.post("/reserva/reservaByVehiculo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(vehiculoJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].user.firstname").value("Pedro"));
    }

    @Test
    @Order(3)
    void save() throws Exception{
        dataLoad();
        vehiculoService.save(vehiculo);

        String reservaJson = objectMapper.writeValueAsString(reservaPrueba);

        mockMvc.perform(MockMvcRequestBuilders.post("/reserva/saveReservas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(reservaJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.TEXT_PLAIN + ";charset=UTF-8"))
                .andExpect(content().string("Reserva guardada con éxito"));
    }

    @Test
    @Order(4)
    void verificarDisponibilidad() throws Exception{
        dataLoad();

        ReservaDTO reservaDTO = new ReservaDTO();
        reservaDTO.setMarca("Citroen");
        reservaDTO.setModelo("C3");
        reservaDTO.setPasajeros(5);
        reservaDTO.setFechaInicio(LocalDate.of(2025, 3, 10));
        reservaDTO.setFechaFin(LocalDate.of(2025, 3, 15)); // Fuera del rango de la reserva existente (20 al 24)

        String dtoJson = objectMapper.writeValueAsString(reservaDTO);

        mockMvc.perform(MockMvcRequestBuilders.post("/reserva/disponibilidad")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(dtoJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].modelo").value("C3")); // Esperamos que el vehículo esté disponible
    }

    @Test
    @Order(5)
    void findByUserAndVehiculo() throws Exception{
        dataLoad();
        reservaService.save(reservaPrueba);

        vehiculo.setId(1L);
        Long userId = reservaPrueba.getUser().getId();
        Long vehiculoId = vehiculo.getId();

        mockMvc.perform(MockMvcRequestBuilders.get("/reserva/historialReserva/" + userId + "/" + vehiculoId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].vehiculo.modelo").value("C3"))
                .andExpect(jsonPath("$[0].user.firstname").value("Pedro"));
    }

    @Test
    @Order(6)
    void findByUser() throws Exception{
        dataLoad(); // Carga entidades relacionadas
        reservaService.save(reservaPrueba); // Guarda la reserva en la BD

        String userJson = objectMapper.writeValueAsString(user); // User con id 2L

        mockMvc.perform(MockMvcRequestBuilders.post("/reserva/historialReservasUser")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].vehiculo.modelo").value("C3"))
                .andExpect(jsonPath("$[0].user.firstname").value("Pedro"));
    }
}