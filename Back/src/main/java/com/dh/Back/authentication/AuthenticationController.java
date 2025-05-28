package com.dh.Back.authentication;

import com.dh.Back.dto.CorreoRequestDTO;
import com.dh.Back.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dh.Back.service.IEmailService;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    IEmailService iEmailService;

    @PostMapping("/user/register")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody RegisterRequest request) throws ResourceNotFoundException {

        AuthenticationResponse response = authenticationService.register(request);

        if(!response.equals("El usuario con el correo " + request.getEmail() + " ya existe")){
            CorreoRequestDTO correoRequestDTO = new CorreoRequestDTO();
            correoRequestDTO.setDestinatario(request.getEmail());
            correoRequestDTO.setAsunto("Bienvenido " + request.getFirstname() + " a driver punilla");
            correoRequestDTO.setMensaje("El usuario " + request.getEmail() + " se ha registrado con exíto");
            correoRequestDTO.setTipo("Registro");
            iEmailService.enviarCorreo(correoRequestDTO);
        }

            return ResponseEntity.ok(response);
    }

    @PostMapping("/user/envioCorreo")
    public ResponseEntity<String> envioCorreo (
            @RequestBody RegisterRequest request) throws ResourceNotFoundException {
        CorreoRequestDTO correoRequestDTO = new CorreoRequestDTO();

        correoRequestDTO.setDestinatario(request.getEmail());
        correoRequestDTO.setAsunto("Bienvenido " + request.getFirstname() + "a driver punilla");
        correoRequestDTO.setMensaje("El usuario " + request.getEmail() + " se ha registrado con exíto");
        iEmailService.enviarCorreo(correoRequestDTO);

        return ResponseEntity.ok("Se envía correo nuevamente");
    }

    @PostMapping("/user/login")
    public ResponseEntity<AuthenticationResponse> login (
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @GetMapping("/listUsers")
    public ResponseEntity<List<AuthenticationResponse>> listAllUser(){
        return ResponseEntity.ok(authenticationService.listAllUsers());
    }

    @PutMapping("/updateUser")
    public ResponseEntity<AuthenticationUpdate> updateUser(@RequestBody AuthenticationUpdate user) throws ResourceNotFoundException{
        return ResponseEntity.ok(authenticationService.updateUser(user));
    }
}
