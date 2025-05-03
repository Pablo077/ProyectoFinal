package com.dh.Back.test;

import com.dh.Back.entity.*;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IFavoritoRepository;
import com.dh.Back.service.impl.FavoritoService;
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

class FavoritoServiceTest {

    @Mock
    private IFavoritoRepository favoritoRepository;

    @InjectMocks
    private FavoritoService favoritoService;

    private User user;
    private Vehiculo vehiculo1;
    private Vehiculo vehiculo2;
    private Caja automatico;
    private Direccion asistido;
    private Categoria hatchbackCompacto;
    private Favorito favorito1;
    private Favorito favorito2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        automatico = new Caja("Automático");
        asistido = new Direccion("Asistido");
        hatchbackCompacto = new Categoria("Hatchback compacto", "", "");
        user = new User(2L, "Pedro", "Diaz", "user@gmail.com", "1234", Role.USER);
        vehiculo1 = new Vehiculo("Citroen", "C3", 1.5f,5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        vehiculo2 = new Vehiculo("Peugeot", "208", 1.2f, 5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto6.png", "{\"images\":[\"Foto6.png\"]}");
        favorito1 = new Favorito(user, vehiculo1);
        favorito1.setId(1L);
        favorito2 = new Favorito(user, vehiculo2);
        favorito2.setId(2L);
    }

    @Test
    void save() throws ResourceNotFoundException {
        when(favoritoRepository.save(favorito1)).thenReturn(favorito1);

        //Act
        Favorito result = favoritoService.save(favorito1);

        //Assert
        assertNotNull(result);
        assertEquals("Citroen", result.getVehiculo().getMarca());
        verify(favoritoRepository, times(1)).save(favorito1);
    }

    @Test
    void findByUser() {
        List<Favorito> favoritosDelUsuario = Arrays.asList(favorito1, favorito2);

        when(favoritoRepository.findByUser(user.getId())).thenReturn(favoritosDelUsuario);

        // Act
        List<Favorito> resultado = favoritoService.findByUser(user);

        // Assert
        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        assertEquals("Citroen", resultado.get(0).getVehiculo().getMarca());
        assertEquals("Peugeot", resultado.get(1).getVehiculo().getMarca());
        verify(favoritoRepository, times(1)).findByUser(user.getId());
    }

    @Test
    void findAll() {
        when(favoritoRepository.findAll()).thenReturn(Arrays.asList(favorito1, favorito2));

        // Act
        List<Favorito> result = favoritoService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(favoritoRepository, times(1)).findAll();
    }

    @Test
    void findById() {
        when(favoritoRepository.findById(1L)).thenReturn(Optional.of(favorito1));

        // Act
        Optional<Favorito> result = favoritoService.findById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("C3", result.get().getVehiculo().getModelo());
        verify(favoritoRepository, times(1)).findById(1L);

    }

    @Test
    void delete() throws ResourceNotFoundException{
        when(favoritoRepository.findById(1L)).thenReturn(Optional.of(favorito1));
        doNothing().when(favoritoRepository).deleteById(1L);

        // Act
        favoritoService.delete(1L);

        // Assert
        verify(favoritoRepository, times(1)).findById(1L);
        verify(favoritoRepository, times(1)).deleteById(1L);
    }
}