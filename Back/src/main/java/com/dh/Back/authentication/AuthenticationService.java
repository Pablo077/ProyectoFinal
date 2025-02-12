package com.dh.Back.authentication;

import com.dh.Back.configuration.JwtService;
import com.dh.Back.entity.Categoria;
import com.dh.Back.entity.Role;
import com.dh.Back.entity.User;
import com.dh.Back.repository.IUserRepository;
import jakarta.annotation.PostConstruct;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        Role rol = Role.ADMIN;

        if(request.getIdrol()==1){
            rol = Role.USER;
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

