package com.dh.Back.authentication;

import com.dh.Back.configuration.JwtService;
import com.dh.Back.entity.Role;
import com.dh.Back.entity.User;
import com.dh.Back.exception.GlobalException;
import com.dh.Back.exception.ResourceNotFoundException;
import com.dh.Back.repository.IUserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws ResourceNotFoundException {
        Role rol = Role.ADMIN;

        if(request.getIdrol()==1){
            rol = Role.USER;
        }

        // Verificar si ya existe un usuario con el mismo correo electrónico
        var userExist = userRepository.findByEmail(request.getEmail())
                .orElse(null);  // Devuelve null si no encuentra un usuario

        if (userExist != null) {
            throw new ResourceNotFoundException("El usuario con el correo " + request.getEmail() + " ya existe");
        }

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(rol)
                .build();

        userRepository.save(user);

        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .token(jwt)
                .rol(user.getRole().toString())
                .build();
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .token(jwt)
                .rol(user.getRole().toString())
                .build();
    }


    public List<AuthenticationResponse> listAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new AuthenticationResponse(user.getId(), user.getFirstname(), user.getLastname(), user.getEmail(),"",user.getRole().toString()))
                .collect(Collectors.toList());
    }

    public AuthenticationUpdate updateUser(AuthenticationUpdate request) throws ResourceNotFoundException {

        Role rol = Role.ADMIN;

        if (request.getId() == null) {
            throw new ResourceNotFoundException("El ID del usuario no puede ser nulo");
        }

        var user = userRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + request.getId()));


        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());

        System.out.println("Ingresa");


        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if(request.getRol().equals("USER")){
            rol = Role.USER;
        }

        if (request.getRol() != null) {
            user.setRole(rol);
        }
        
        userRepository.save(user);

        return new AuthenticationUpdate(user.getId(), user.getFirstname(), user.getLastname(), user.getEmail(), "",user.getRole().toString());

    }


    @PostConstruct
    public void initData() {
        var user = User.builder()
                .firstname("Juan")
                .lastname("Perez")
                .email("admin@gmail.com")
                .password(passwordEncoder.encode("1234"))
                .role(Role.ADMIN)
                .build();

        userRepository.save(user);
    }



}

