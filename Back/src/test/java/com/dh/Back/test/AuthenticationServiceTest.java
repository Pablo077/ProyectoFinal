package com.dh.Back.test;

import com.dh.Back.authentication.*;
import com.dh.Back.configuration.JwtService;
import com.dh.Back.entity.Role;
import com.dh.Back.entity.User;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {
    @Mock
    private IUserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    private RegisterRequest userRegister;
    private User user;
    private AuthenticationRequest userLogin;


    @BeforeEach
    void setUp() {
        userRegister = new RegisterRequest("Nombre", "Apellido", "nombre@gmail.com", "1234", 1);
        user = User.builder()
                .id(2L)
                .firstname("Nombre")
                .lastname("Apellido")
                .email("nombre@gmail.com")
                .password("encodedPassword")
                .role(Role.USER)
                .build();
        userLogin = AuthenticationRequest.builder()
                .email("nombre@gmail.com")
                .password("1234")
                .build();
    }

    @Test
    void register() throws ResourceNotFoundException {
        // Arrange
        when(userRepository.findByEmail("nombre@gmail.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("1234")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setId(2L); // simulamos que se le asigna un ID
            return savedUser;
        });
        when(jwtService.generateToken(any(User.class))).thenReturn("fake-jwt-token");

        // Act
        AuthenticationResponse result = authenticationService.register(userRegister);

        // Assert
        assertNotNull(result);
        assertEquals("Nombre", result.getFirstname());
        assertEquals("Apellido", result.getLastname());
        assertEquals("fake-jwt-token", result.getToken());
        assertEquals("USER", result.getRol());

        verify(userRepository).findByEmail("nombre@gmail.com");
        verify(passwordEncoder).encode("1234");
        verify(userRepository).save(any(User.class));
        verify(jwtService).generateToken(any(User.class));
    }

    @Test
    void login() {
        // Arrange
        when(userRepository.findByEmail("nombre@gmail.com")).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("fake-jwt-token");
        when(authenticationManager.authenticate(any())).thenReturn(mock(Authentication.class));

        // Act
        AuthenticationResponse result = authenticationService.login(userLogin);

        // Assert
        assertNotNull(result);
        assertEquals("Nombre", result.getFirstname());
        assertEquals("Apellido", result.getLastname());
        assertEquals("fake-jwt-token", result.getToken());
        assertEquals("USER", result.getRol());
        assertEquals("nombre@gmail.com", result.getEmail());

        verify(authenticationManager).authenticate(any());
        verify(userRepository).findByEmail("nombre@gmail.com");
        verify(jwtService).generateToken(user);
    }

    @Test
    void listAllUsers() {
        // Arrange
        User user1 = new User(1L, "Juan", "Pérez", "juan@gmail.com", "1234", Role.USER);
        User user2 = new User(2L, "Ana", "Gómez", "ana@gmail.com", "abcd", Role.ADMIN);
        List<User> users = List.of(user1, user2);

        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<AuthenticationResponse> result = authenticationService.listAllUsers();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());

        AuthenticationResponse res1 = result.get(0);
        assertEquals("Juan", res1.getFirstname());
        assertEquals("Pérez", res1.getLastname());
        assertEquals("juan@gmail.com", res1.getEmail());
        assertEquals("USER", res1.getRol());
        assertEquals("", res1.getToken()); // El token debe estar vacío

        AuthenticationResponse res2 = result.get(1);
        assertEquals("Ana", res2.getFirstname());
        assertEquals("Gómez", res2.getLastname());
        assertEquals("ana@gmail.com", res2.getEmail());
        assertEquals("ADMIN", res2.getRol());
        assertEquals("", res2.getToken());

        verify(userRepository).findAll();
    }

    @Test
    void updateUser() throws ResourceNotFoundException{
        // Arrange
        Long userId = 1L;
        User existingUser = new User(userId, "Juan", "Pérez", "juan@gmail.com", "oldPassword", Role.USER);

        AuthenticationUpdate updateRequest = new AuthenticationUpdate(
                userId,
                "Carlos",
                "Ramírez",
                "carlos@gmail.com",
                "newPassword",
                "ADMIN"
        );

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        AuthenticationUpdate result = authenticationService.updateUser(updateRequest);

        // Assert
        assertNotNull(result);
        assertEquals(userId, result.getId());
        assertEquals("Carlos", result.getFirstname());
        assertEquals("Ramírez", result.getLastname());
        assertEquals("carlos@gmail.com", result.getEmail());
        assertEquals("ADMIN", result.getRol());
        assertEquals("", result.getPassword()); // asumimos que el método setea password vacío


        // Verificaciones
        verify(userRepository).findById(userId);
        verify(passwordEncoder).encode("newPassword");
        verify(userRepository).save(existingUser);
    }


}