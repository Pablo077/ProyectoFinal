package com.dh.Back.test;

import com.dh.Back.service.impl.CajaService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import com.dh.Back.entity.Caja;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.ICajaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;



class CajaServiceTest {
    @Mock
    private ICajaRepository cajaRepository;

    @InjectMocks
    private CajaService cajaService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Inicializa los mocks
    }

    @Test
    void save() throws ResourceNotFoundException {
        // Arrange
        Caja caja = new Caja();
        caja.setId(1L);
        caja.setTipo("Automático");

        when(cajaRepository.save(caja)).thenReturn(caja);

        // Act
        Caja result = cajaService.save(caja);

        // Assert
        assertNotNull(result);
        assertEquals("Automático", result.getTipo());
        verify(cajaRepository, times(1)).save(caja);
    }

    @Test
    void findAll() {
        // Arrange
        Caja caja1 = new Caja();
        caja1.setId(1L);
        caja1.setTipo("Automático");

        Caja caja2 = new Caja();
        caja2.setId(2L);
        caja2.setTipo("Manual");

        when(cajaRepository.findAll()).thenReturn(Arrays.asList(caja1, caja2));

        // Act
        List<Caja> result = cajaService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(cajaRepository, times(1)).findAll();
    }

    @Test
    void findById() {
        // Arrange
        Caja caja = new Caja();
        caja.setId(1L);
        caja.setTipo("Automático");

        when(cajaRepository.findById(1L)).thenReturn(Optional.of(caja));

        // Act
        Optional<Caja> result = cajaService.findById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Automático", result.get().getTipo());
        verify(cajaRepository, times(1)).findById(1L);
    }

    @Test
    void testSaveThrowsException() {
        // Arrange
        Caja caja = new Caja();
        caja.setId(1L);
        caja.setTipo("Automático");

        when(cajaRepository.save(caja)).thenThrow(new RuntimeException("Error al guardar"));

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> cajaService.save(caja));
        verify(cajaRepository, times(1)).save(caja);
    }
}