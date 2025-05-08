package com.dh.Back.testIntegracion;

import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.service.*;
import com.dh.Back.dto.BodySavePuntuacionDTO;
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

import java.time.LocalDate;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class PuntuacionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IPuntuacionService puntuacionService;

    @Autowired
    private IVehiculoService vehiculoService;

    @Autowired
    private ICajaService cajaService;

    @Autowired
    private IDireccionService direccionService;

    @Autowired
    private ICategoriaService categoriaService;

    @Autowired
    private IReservaService reservaService;

    private Vehiculo vehiculo;
    private Caja automatico;
    private Direccion asistido;
    private Categoria hatchbackCompacto;
    private User user;
    private Reserva reservaPrueba;
    private Puntuacion puntuacionPrueba;

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

        LocalDate fechaPuntuacion1 = LocalDate.of(2025, 3, 24);
        puntuacionPrueba = new Puntuacion(reservaPrueba, 4, fechaPuntuacion1, "Auto muy comodo. Super recomendable");
    }

    @Test
    @Order(1)
    void save() throws Exception{
        dataLoad();
        vehiculoService.save(vehiculo);
        reservaService.save(reservaPrueba); // Asegurate de guardar la reserva antes de usarla

        // Crear el BodySavePuntuacionDTO
        BodySavePuntuacionDTO body = new BodySavePuntuacionDTO();
        body.setReservaId(reservaPrueba.getId()); // Usa el ID de la reserva guardada
        body.setValor(4); // Valor de la puntuación
        body.setFechaPuntuacion(LocalDate.of(2025, 3, 24)); // Fecha de la puntuación
        body.setResena("Auto muy comodo. Super recomendable"); // Reseña

        // Convertir el DTO a JSON
        String puntuacionJson = objectMapper.writeValueAsString(body);

        // Hacer la solicitud POST
        mockMvc.perform(MockMvcRequestBuilders.post("/puntuacion")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(puntuacionJson))
                .andExpect(status().isOk())  // Esperamos un 200 OK
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));  // Esperamos tipo de contenido JSON

    }

    @Test
    @Order(2)
    void findByUserAndVehiculo() throws Exception{
        dataLoad();
        vehiculo.setId(1L);
        mockMvc.perform(MockMvcRequestBuilders.get("/puntuacion/PuntuacionesByUserVehiculo/{userId}/{vehiculoId}", user.getId(), vehiculo.getId()))
                .andExpect(status().isOk())  // Esperamos un 200 OK
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].resena", is("Auto muy comodo. Super recomendable")));
    }

    @Test
    @Order(3)
    void findByVehiculo() throws Exception{
        dataLoad();
        vehiculo.setId(1L);

        mockMvc.perform(MockMvcRequestBuilders.get("/puntuacion/PuntuacionesByVehiculo/{vehiculoId}", vehiculo.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].valor", is(4)))
                .andExpect(jsonPath("$[0].resena", is("Auto muy comodo. Super recomendable")));
    }

    @Test
    @Order(4)
    void puntuacionPromedioByVehiculo() throws Exception{


        Reserva reserva = reservaService.findById(1L).orElseThrow(); // ID correcto según tu DataInitializer
        Vehiculo vehiculo = reserva.getVehiculo();

        mockMvc.perform(MockMvcRequestBuilders.get("/puntuacion/PuntuacionesPromedio"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].vehiculoId", is(vehiculo.getId().intValue())))
                .andExpect(jsonPath("$[0].promedio", is(4.5)))  // si guardaste 4 y 5
                .andExpect(jsonPath("$[0].cantidad", is(2)));

    }
}