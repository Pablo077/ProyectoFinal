package com.dh.Back.test;

import com.dh.Back.dto.PuntuacionPromedioDTO;
import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IPuntuacionRepository;
import com.dh.Back.service.impl.PuntuacionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PuntuacionServiceTest {

    @Mock
    private IPuntuacionRepository puntuacionRepository;

    @InjectMocks
    private PuntuacionService puntuacionService;

    private User user;
    private Vehiculo vehiculo1;
    private Vehiculo vehiculo2;
    private Caja automatico;
    private Direccion asistido;
    private Categoria hatchbackCompacto;
    private Reserva reserva1;
    private Reserva reserva2;
    private Puntuacion puntuacion1;
    private Puntuacion puntuacion2;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        automatico = new Caja("Automático");
        asistido = new Direccion("Asistido");
        hatchbackCompacto = new Categoria("Hatchback compacto", "", "");
        user = new User(2L, "Pedro", "Diaz", "user@gmail.com", "1234", Role.USER);
        vehiculo1 = new Vehiculo("Citroen", "C3", 1.5f, 5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        vehiculo2 = new Vehiculo("Peugeot", "208", 1.2f, 5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto6.png", "{\"images\":[\"Foto6.png\"]}");
        LocalDate fechaInicio1 = LocalDate.of(2025, 3, 20);
        LocalDate fechaFinal1 = LocalDate.of(2025, 3, 24);
        reserva1 = new Reserva(user, vehiculo1, fechaInicio1, fechaFinal1);
        LocalDate fechaInicio2 = LocalDate.of(2025, 4, 1);
        LocalDate fechaFinal2 = LocalDate.of(2025, 4, 5);
        reserva2 = new Reserva(user, vehiculo1, fechaInicio2, fechaFinal2);

        LocalDate fechaPuntuacion1 = LocalDate.of(2025, 3, 24);
        puntuacion1 = new Puntuacion(reserva1, 4, fechaPuntuacion1, "Auto muy comodo. Super recomendable");
        puntuacion1.setId(1L);
        LocalDate fechaPuntuacion2 = LocalDate.of(2025, 4, 5);
        puntuacion2 = new Puntuacion(reserva2, 5, fechaPuntuacion2, "Auto muy comodo. Super recomendable");
        puntuacion2.setId(2L);
    }

    @Test
    void save() throws ResourceNotFoundException {
        when(puntuacionRepository.save(puntuacion1)).thenReturn(puntuacion1);

        //Act
        Puntuacion result = puntuacionService.save(puntuacion1);

        //Assert
        assertNotNull(result);
        assertEquals("Citroen", result.getReserva().getVehiculo().getMarca());
        verify(puntuacionRepository, times(1)).save(puntuacion1);
    }

    @Test
    void findByUserAndVehiculo() throws ResourceNotFoundException {
        // Arrange
        when(puntuacionRepository.findByUserAndVehiculo(user.getId(), vehiculo1.getId()))
                .thenReturn(java.util.Collections.singletonList(puntuacion1));

        // Act
        List<Puntuacion> resultado = puntuacionService.findByUserAndVehiculo(user.getId(), vehiculo1.getId());

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals(4, resultado.get(0).getValor());
        assertEquals("Auto muy comodo. Super recomendable", resultado.get(0).getResena());
        verify(puntuacionRepository, times(1))
                .findByUserAndVehiculo(user.getId(), vehiculo1.getId());
    }

    @Test
    void puntuacionPromedioByVehiculo() throws ResourceNotFoundException {
        // Arrange
        List<PuntuacionPromedioDTO> promediosSimulados = Arrays.asList(
                new PuntuacionPromedioDTO(vehiculo1.getId(), 4.5, 1L),
                new PuntuacionPromedioDTO(vehiculo2.getId(), 3.8, 1L)
        );

        when(puntuacionRepository.puntuacionPromedioByVehiculo()).thenReturn(promediosSimulados);

        // Act
        List<PuntuacionPromedioDTO> resultados = puntuacionService.puntuacionPromedioByVehiculo();

        // Assert
        assertNotNull(resultados);
        assertEquals(2, resultados.size());

        // Verificamos el primer DTO
        assertEquals(vehiculo1.getId(), resultados.get(0).getVehiculoId());
        assertEquals(4.5, resultados.get(0).getPromedio(), 0.001);

        // Verificamos el segundo DTO
        assertEquals(vehiculo2.getId(), resultados.get(1).getVehiculoId());
        assertEquals(3.8, resultados.get(1).getPromedio(), 0.001);

        verify(puntuacionRepository, times(1)).puntuacionPromedioByVehiculo();
    }

    @Test
    void findByVehiculo() throws ResourceNotFoundException {
        // Arrange
        when(puntuacionRepository.findByVehiculo(vehiculo1.getId()))
                .thenReturn(Arrays.asList(puntuacion1, puntuacion2));

        // Act
        List<Puntuacion> resultados = puntuacionService.findByVehiculo(vehiculo1.getId());

        // Assert
        assertNotNull(resultados);
        assertEquals(2, resultados.size());
        assertEquals(4, resultados.get(0).getValor());
        assertEquals(5, resultados.get(1).getValor());
        verify(puntuacionRepository, times(1)).findByVehiculo(vehiculo1.getId());
    }
}