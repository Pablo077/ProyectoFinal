package com.dh.Back.test;


import com.dh.Back.entity.Direccion;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IDireccionRepository;
import com.dh.Back.service.impl.DireccionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DireccionServiceTest {

    @Mock
    private IDireccionRepository direccionRepository;

    @InjectMocks
    private DireccionService direccionService;

    private Direccion direccionAsistido;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        direccionAsistido = new Direccion("Asistido");
    }

    @Test
    void save() throws ResourceNotFoundException {
        when(direccionRepository.save(direccionAsistido)).thenReturn(direccionAsistido);

        //Act
        Direccion result = direccionService.save(direccionAsistido);

        //Assert
        assertNotNull(result);
        assertEquals("Asistido", result.getTipo());
        verify(direccionRepository, times(1)).save(direccionAsistido);
    }

    @Test
    void findAll() {
        //Arrange
        Direccion direccionHibrido = new Direccion("Hibrido");

        when(direccionRepository.findAll()).thenReturn(Arrays.asList(direccionAsistido, direccionHibrido));

        // Act
        List<Direccion> result = direccionService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(direccionRepository, times(1)).findAll();
    }

    @Test
    void findById() {
        when(direccionRepository.findById(1L)).thenReturn(Optional.of(direccionAsistido));

        // Act
        Optional<Direccion> result = direccionService.findById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Asistido", result.get().getTipo());
        verify(direccionRepository, times(1)).findById(1L);

    }
}