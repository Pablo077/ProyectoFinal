package com.dh.Back.test;

import com.dh.Back.entity.Categoria;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.ICategoriaRepository;
import com.dh.Back.service.impl.CategoriaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CategoriaServiceTest {

    @Mock
    private ICategoriaRepository categoriaRepository;

    @InjectMocks
    private CategoriaService categoriaService;
    private Categoria categoria1;
    private Categoria categoria2;
    private static final String BASE_UPLOAD_DIR = "test-uploads/";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        categoria1 = new Categoria("Furgoneta","","");
        categoria1.setId(1L);
        categoria2 = new Categoria("Hatchback compacto", "", "");
        categoria2.setId(2L);

    }

    @Test
    void save() throws ResourceNotFoundException {
        when(categoriaRepository.save(categoria1)).thenReturn(categoria1);

        // Act
        Categoria result = categoriaService.save(categoria1);

        // Assert
        assertNotNull(result);
        assertEquals("Furgoneta", result.getNombre());
        verify(categoriaRepository, times(1)).save(categoria1);
    }

    @Test
    void findAll() {
        when(categoriaRepository.findAll()).thenReturn(Arrays.asList(categoria1, categoria2));

        // Act
        List<Categoria> result = categoriaService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(categoriaRepository, times(1)).findAll();
    }

    @Test
    void findById() {
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoria1));

        // Act
        Optional<Categoria> result = categoriaService.findById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Furgoneta", result.get().getNombre());
        verify(categoriaRepository, times(1)).findById(1L);
    }

    @Test
    void delete() throws ResourceNotFoundException{
        // Arrange (Preparar)
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoria1));
        doNothing().when(categoriaRepository).deleteById(1L);

        // Simular la existencia del directorio de imágenes
        String sanitizedFolderName = BASE_UPLOAD_DIR + "/" + categoria1.getMainImage();
        File mockDir = new File(BASE_UPLOAD_DIR + sanitizedFolderName + "/");
        mockDir.mkdirs(); // Crear el directorio simulado

        assertTrue(mockDir.exists()); // Asegurarnos de que el directorio simulado existe

        // Act (Actuar)
        categoriaService.delete(1L);

        // Assert (Verificar)
        verify(categoriaRepository, times(1)).findById(1L);
        verify(categoriaRepository, times(1)).deleteById(1L);
        File[] contents = mockDir.listFiles();
        assertFalse(mockDir.exists()); // Verificar que el directorio se eliminó
    }


}