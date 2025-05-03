package com.dh.Back.test;

import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IReservaRepository;
import com.dh.Back.service.impl.ReservaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReservaServiceTest {

    @Mock
    private IReservaRepository reservaRepository;

    @InjectMocks
    private ReservaService reservaService;

    private User user;
    private Vehiculo vehiculo1;
    private Vehiculo vehiculo2;
    private Caja automatico;
    private Direccion asistido;
    private Categoria hatchbackCompacto;
    private Reserva reserva1;
    private Reserva reserva2;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        automatico = new Caja("Automático");
        asistido = new Direccion("Asistido");
        hatchbackCompacto = new Categoria("Hatchback compacto", "", "");
        user = new User(2L, "Pedro", "Diaz", "user@gmail.com", "1234", Role.USER);
        vehiculo1 = new Vehiculo("Citroen", "C3", 1.5f, 5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        vehiculo1.setId(1L);
        vehiculo2 = new Vehiculo("Peugeot", "208", 1.2f, 5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto6.png", "{\"images\":[\"Foto6.png\"]}");
        vehiculo2.setId(2L);

        LocalDate fechaInicio1 = LocalDate.of(2025, 3, 20);
        LocalDate fechaFinal1 = LocalDate.of(2025, 3, 24);
        reserva1 = new Reserva(user, vehiculo1, fechaInicio1, fechaFinal1);
        reserva1.setId(1L);

        LocalDate fechaInicio2 = LocalDate.of(2025, 4, 1);
        LocalDate fechaFinal2 = LocalDate.of(2025, 4, 5);
        reserva2 = new Reserva(user, vehiculo1, fechaInicio2, fechaFinal2);
        reserva2.setId(2L);

    }

    @Test
    void save() throws ResourceNotFoundException {
        when(reservaRepository.save(reserva1)).thenReturn(reserva1);

        //Act
        String result = reservaService.save(reserva1);

        //Assert
        assertNotNull(result);
        assertEquals("Reserva guardada con éxito", result);
        verify(reservaRepository, times(1)).save(reserva1);
    }

    @Test
    void verificarDisponibilidad() throws ResourceNotFoundException {
//Arrange
        LocalDate fechaInicioConsulta = LocalDate.of(2025, 5, 5);
        LocalDate fechaFinConsulta = LocalDate.of(2025, 5, 10);
        List<Vehiculo> vehiculosAFiltrar = Arrays.asList(vehiculo1, vehiculo2);

        when(reservaRepository.verificarDisponibilidad(vehiculo1.getId(), fechaInicioConsulta, fechaFinConsulta)).thenReturn(Collections.emptyList());
        when(reservaRepository.verificarDisponibilidad(vehiculo2.getId(), fechaInicioConsulta, fechaFinConsulta)).thenReturn(Collections.emptyList());

        //Act
        List<Vehiculo> disponibles = reservaService.verificarDisponibilidad(vehiculosAFiltrar, fechaInicioConsulta, fechaFinConsulta);

        //Assert
        assertNotNull(disponibles);
        assertEquals(2, disponibles.size());
        assertTrue(disponibles.contains(vehiculo1));
        assertTrue(disponibles.contains(vehiculo2));
        verify(reservaRepository, times(1)).verificarDisponibilidad(vehiculo1.getId(), fechaInicioConsulta, fechaFinConsulta);
        verify(reservaRepository, times(1)).verificarDisponibilidad(vehiculo2.getId(), fechaInicioConsulta, fechaFinConsulta);
    }

    @Test
    void findAll() {
        when(reservaRepository.findAll()).thenReturn(Arrays.asList(reserva1, reserva2));

        // Act
        List<Reserva> result = reservaService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(reservaRepository, times(1)).findAll();
    }

    @Test
    void findByVehiculo() {
        // Arrange
        when(reservaRepository.findByVehiculo(vehiculo1)).thenReturn(Optional.of(Arrays.asList(reserva1, reserva2)));

        // Act
        Optional<List<Reserva>> reservas = reservaService.findByVehiculo(vehiculo1);

        // Assert
        assertTrue(reservas.isPresent());
        assertEquals(2, reservas.get().size());
        assertTrue(reservas.get().contains(reserva1));
        assertTrue(reservas.get().contains(reserva2));
        verify(reservaRepository, times(1)).findByVehiculo(vehiculo1);
    }

    @Test
    void findByUserAndVehiculo() throws ResourceNotFoundException {
        // Arrange
        when(reservaRepository.findByUserAndVehiculo(user.getId(), vehiculo1.getId())).thenReturn(Arrays.asList(reserva1));

        // Act
        List<Reserva> reservas = reservaService.findByUserAndVehiculo(user.getId(), vehiculo1.getId());

        // Assert
        assertNotNull(reservas);
        assertEquals(1, reservas.size());
        assertTrue(reservas.contains(reserva1));
        verify(reservaRepository, times(1)).findByUserAndVehiculo(user.getId(), vehiculo1.getId());
    }

    @Test
    void findById() throws ResourceNotFoundException {
        // Arrange
        when(reservaRepository.findById(reserva1.getId())).thenReturn(Optional.of(reserva1));

        // Act
        Optional<Reserva> reservaOptional = reservaService.findById(reserva1.getId());

        // Assert
        assertTrue(reservaOptional.isPresent());
        assertEquals(reserva1, reservaOptional.get());
        verify(reservaRepository, times(1)).findById(reserva1.getId());
    }

    @Test
    void findByUser() throws ResourceNotFoundException {
        // Arrange
        when(reservaRepository.findByUser(user)).thenReturn(Optional.of(Arrays.asList(reserva1, reserva2)));

        // Act
        Optional<List<Reserva>> reservas = reservaService.findByUser(user);

        // Assert
        assertTrue(reservas.isPresent());
        assertEquals(2, reservas.get().size());
        assertTrue(reservas.get().contains(reserva1));
        assertTrue(reservas.get().contains(reserva2));
        verify(reservaRepository, times(1)).findByUser(user);
    }
}