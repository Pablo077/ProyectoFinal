package com.dh.Back.test;

import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IVehiculoRepository;
import com.dh.Back.service.impl.VehiculoService;
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

class VehiculoServiceTest {

    @Mock
    private IVehiculoRepository vehiculoRepository;

    @InjectMocks
    private VehiculoService vehiculoService;

    private User user;
    private Vehiculo vehiculo1;
    private Vehiculo vehiculo2;
    private Caja automatico;
    private Direccion asistido;
    private Categoria hatchbackCompacto;
    private static final String BASE_UPLOAD_DIR = "test-uploads/";


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
    }

    @Test
    void save() {
        when(vehiculoRepository.save(vehiculo1)).thenReturn(vehiculo1);

        //Act
        Vehiculo result = vehiculoService.save(vehiculo1);

        //Assert
        assertNotNull(result);
        assertEquals("Citroen", result.getMarca());
        verify(vehiculoRepository, times(1)).save(vehiculo1);
    }

    @Test
    void findAll() {
        when(vehiculoRepository.findAll()).thenReturn(Arrays.asList(vehiculo1, vehiculo2));

        // Act
        List<Vehiculo> result = vehiculoService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(vehiculoRepository, times(1)).findAll();
    }

    @Test
    void findByMarcaAndModelo() {
        // Arrange
        String marca = "Citroen";
        String modelo = "C3";
        when(vehiculoRepository.findByMarcaAndModelo(marca, modelo)).thenReturn(Optional.of(vehiculo1));

        // Act
        Optional<Vehiculo> result = vehiculoService.findByMarcaAndModelo(marca, modelo);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Citroen", result.get().getMarca());
        assertEquals("C3", result.get().getModelo());
        verify(vehiculoRepository, times(1)).findByMarcaAndModelo(marca, modelo);
    }

    @Test
    void findById() {
        // Arrange
        Long vehiculoId = 1L;
        when(vehiculoRepository.findById(vehiculoId)).thenReturn(Optional.of(vehiculo1));

        // Act
        Optional<Vehiculo> result = vehiculoService.findById(vehiculoId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(vehiculoId, result.get().getId());
        assertEquals("Citroen", result.get().getMarca());
        verify(vehiculoRepository, times(1)).findById(vehiculoId);
    }

    @Test
    void delete() throws ResourceNotFoundException {
        // Arrange
        Long vehiculoId = 1L;
        when(vehiculoRepository.findById(vehiculoId)).thenReturn(Optional.of(vehiculo1));
        doNothing().when(vehiculoRepository).deleteById(vehiculoId);

        // Simular la existencia del directorio de imágenes
        String sanitizedFolderName = (vehiculo1.getMarca() + "_" + vehiculo1.getModelo()).replaceAll("[^a-zA-Z0-9_]", "_");
        File mockDir = new File(BASE_UPLOAD_DIR + sanitizedFolderName + "/");
        mockDir.mkdirs(); // Crear el directorio simulado

        assertTrue(mockDir.exists()); // Asegurarnos de que el directorio simulado existe

        // Act
        vehiculoService.delete(vehiculoId);

        // Assert
        verify(vehiculoRepository, times(1)).findById(vehiculoId);
        verify(vehiculoRepository, times(1)).deleteById(vehiculoId);
        File[] contents = mockDir.listFiles();
        assertFalse(mockDir.exists()); // Verificar que el directorio se eliminó
    }

    @Test
    void update() {
        // Arrange
        vehiculo2.setId(1L);
        when(vehiculoRepository.save(vehiculo2)).thenReturn(vehiculo2);

        // Act
        Vehiculo resultado = vehiculoService.update(vehiculo2);

        // Assert
        assertNotNull(resultado);
        assertEquals(vehiculo2.getId(), resultado.getId());
        assertEquals(vehiculo2.getMarca(), resultado.getMarca());
        assertEquals(vehiculo2.getModelo(), resultado.getModelo());
        verify(vehiculoRepository, times(1)).save(vehiculo2);
    }

    @Test
    void getMarcas() {
        // Arrange
        when(vehiculoRepository.findAll()).thenReturn(Arrays.asList(vehiculo1, vehiculo2, new Vehiculo("Citroen", "C4", 1.6f, 5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto7.png", "{}")));

        // Act
        List<String> marcas = vehiculoService.getMarcas();

        // Assert
        assertNotNull(marcas);
        assertEquals(2, marcas.size());
        assertTrue(marcas.contains("Citroen"));
        assertTrue(marcas.contains("Peugeot"));
        assertFalse(marcas.contains("Renault")); // Aseguramos que no haya marcas inesperadas
        verify(vehiculoRepository, times(1)).findAll();
    }

    @Test
    void getModelosByMarca() {
        // Arrange
        String marca = "Citroen";
        when(vehiculoRepository.findModelosByMarca(marca)).thenReturn(Arrays.asList("C3", "C4"));

        // Act
        List<String> modelos = vehiculoService.getModelosByMarca(marca);

        // Assert
        assertNotNull(modelos);
        assertEquals(2, modelos.size());
        assertTrue(modelos.contains("C3"));
        assertTrue(modelos.contains("C4"));
        assertFalse(modelos.contains("208"));
        verify(vehiculoRepository, times(1)).findModelosByMarca(marca);
    }

    @Test
    void buscarVehiculosDisponibles() {
        // Arrange
        String marca = "Citroen";
        String modelo = "C3";
        Integer pasajeros = 5;
        when(vehiculoRepository.buscarPorCriterios(marca, modelo, pasajeros)).thenReturn(Arrays.asList(vehiculo1));

        // Act
        List<Vehiculo> resultados = vehiculoService.buscarVehiculosDisponibles(marca, modelo, pasajeros);

        // Assert
        assertNotNull(resultados);
        assertEquals(1, resultados.size());
        assertEquals("Citroen", resultados.get(0).getMarca());
        assertEquals("C3", resultados.get(0).getModelo());
        assertEquals(5, resultados.get(0).getPasajeros());
        verify(vehiculoRepository, times(1)).buscarPorCriterios(marca, modelo, pasajeros);
    }

}