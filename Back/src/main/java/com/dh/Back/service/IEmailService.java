package com.dh.Back.service;

import com.dh.Back.dto.CorreoRequestDTO;

public interface IEmailService {
    void enviarCorreo(CorreoRequestDTO correoRequestDTO);
}
