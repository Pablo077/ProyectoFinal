package com.dh.Back.test;

import static org.junit.jupiter.api.Assertions.*;
import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.ICaracteristicaRepository;
import com.dh.Back.service.impl.CaracteristicaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;


class CaracteristicaServiceTest {
    @Mock
    private ICaracteristicaRepository caracteristicaRepository;

    @InjectMocks
    private CaracteristicaService caracteristicaService;

    private User user;
    private Vehiculo vehiculo1;
    private Caja automatico;
    private Direccion asistido;
    private Categoria hatchbackCompacto;
    private Caracteristica caracteristica1;
    private Caracteristica caracteristica2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        automatico = new Caja("Automático");
        asistido = new Direccion("Asistido");
        hatchbackCompacto = new Categoria("Hatchback compacto", "", "");
        user = new User(2L, "Pedro", "Diaz", "user@gmail.com", "1234", Role.USER);
        vehiculo1 = new Vehiculo("Citroen", "C3", 1.5f,5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        caracteristica1 = new Caracteristica("Wifi", 1, vehiculo1);
        caracteristica1.setId(1L);
        caracteristica2 = new Caracteristica("Aire acondicionado", 2, vehiculo1);
        caracteristica2.setId(2L);
    }

    @Test
    void save() throws ResourceNotFoundException {
        when(caracteristicaRepository.save(caracteristica1)).thenReturn(caracteristica1);

        //Act
        Caracteristica result = caracteristicaService.save(caracteristica1);

        //Assert
        assertNotNull(result);
        assertEquals("Automático", result.getVehiculo().getCaja().getTipo());
        verify(caracteristicaRepository, times(1)).save(caracteristica1);

    }

    @Test
    void findAll() {
        when(caracteristicaRepository.findAll()).thenReturn(Arrays.asList(caracteristica1, caracteristica2));

        //Act
        List<Caracteristica> result = caracteristicaService.findAll();

        //Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(caracteristicaRepository, times(1)).findAll();
    }

    @Test
    void findById() {
        when(caracteristicaRepository.findById(1L)).thenReturn(Optional.of(caracteristica1));

        //Act
        Optional<Caracteristica> result = caracteristicaService.findById(1L);

        //Assert
        assertTrue(result.isPresent());
        assertEquals("Automático", result.get().getVehiculo().getCaja().getTipo());
        verify(caracteristicaRepository, times(1)).findById(1L);
    }

    @Test
    void findByVehiculo() throws ResourceNotFoundException{
        when(caracteristicaRepository.findByVehiculo(vehiculo1)).thenReturn(Arrays.asList(caracteristica1, caracteristica2));

        // Act
        List<Caracteristica> result = caracteristicaService.findByVehiculo(vehiculo1);

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Wifi", result.get(0).getNombre());
        assertEquals("Aire acondicionado", result.get(1).getNombre());
        verify(caracteristicaRepository, times(1)).findByVehiculo(vehiculo1);
    }

    @Test
    void update() throws ResourceNotFoundException{
        Caracteristica existingCaracteristica = new Caracteristica("Wifi", 1, vehiculo1);
        Long caracteristicaId = 1L;
        existingCaracteristica.setId(caracteristicaId); // Set the ID on the existing entity

        when(caracteristicaRepository.findById(caracteristicaId)).thenReturn(Optional.of(existingCaracteristica));
        when(caracteristicaRepository.save(any(Caracteristica.class))).thenAnswer(invocation -> {
            Caracteristica savedCaracteristica = invocation.getArgument(0);
            savedCaracteristica.setId(caracteristicaId); // Ensure the ID is set on the saved entity
            return savedCaracteristica;
        });

        // Act
        Caracteristica updatedCaracteristica = new Caracteristica("Bluetooth", 1, vehiculo1);
        updatedCaracteristica.setId(caracteristicaId); // Ensure the ID is set on the updated object
        Caracteristica result = caracteristicaService.update(updatedCaracteristica);

        // Assert
        assertNotNull(result);
        assertEquals("Bluetooth", result.getNombre());
        verify(caracteristicaRepository, times(1)).findById(caracteristicaId); // Verify findById was called
        verify(caracteristicaRepository, times(1)).save(any(Caracteristica.class)); // Verify save was called
        assertEquals(caracteristicaId, result.getId()); // Verify the ID remains the same
    }

    @Test
    void delete() throws ResourceNotFoundException{
        when(caracteristicaRepository.findById(1L)).thenReturn(Optional.of(caracteristica1));
        doNothing().when(caracteristicaRepository).deleteById(1L);

        // Act
        caracteristicaService.delete(1L);

        // Assert
        verify(caracteristicaRepository, times(1)).findById(1L);
        verify(caracteristicaRepository, times(1)).deleteById(1L);
    }
}