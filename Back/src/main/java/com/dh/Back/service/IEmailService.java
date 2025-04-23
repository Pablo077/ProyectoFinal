package com.dh.Back.authentication;

import com.dh.Back.dto.CorreoRequestDTO;

public interface IEmailService {
    void enviarCorreo(CorreoRequestDTO correoRequestDTO);
}
