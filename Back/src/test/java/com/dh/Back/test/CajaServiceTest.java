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
    private Caja caja1;
    private Caja caja2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        caja1 = new Caja("Automático");
        caja1.setId(1L);
        caja2 = new Caja("Manual");
        caja2.setId(2L);
    }

    @Test
    void save() throws ResourceNotFoundException {
        when(cajaRepository.save(caja1)).thenReturn(caja1);

        // Act
        Caja result = cajaService.save(caja1);

        // Assert
        assertNotNull(result);
        assertEquals("Automático", result.getTipo());
        verify(cajaRepository, times(1)).save(caja1);
    }

    @Test
    void findAll() {
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
        when(cajaRepository.findById(1L)).thenReturn(Optional.of(caja1));

        // Act
        Optional<Caja> result = cajaService.findById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Automático", result.get().getTipo());
        verify(cajaRepository, times(1)).findById(1L);
    }

    @Test
    void testSaveThrowsException() {
        when(cajaRepository.save(caja1)).thenThrow(new RuntimeException("Error al guardar"));

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> cajaService.save(caja1));
        verify(cajaRepository, times(1)).save(caja1);
    }
}