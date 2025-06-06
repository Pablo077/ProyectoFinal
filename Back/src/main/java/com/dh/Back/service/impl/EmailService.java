package com.dh.Back.service.impl;

import com.dh.Back.dto.CorreoRequestDTO;
import com.dh.Back.service.IEmailService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService implements IEmailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    public EmailService(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    public void enviarCorreo(CorreoRequestDTO correoRequestDTO) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(correoRequestDTO.getDestinatario());
            helper.setSubject(correoRequestDTO.getAsunto());
            helper.setFrom("pfbalarma@gmail.com"); // Opcional si no se setea automáticamente

            // Procesar la plantilla Thymeleaf
            Context context = new Context();
            context.setVariable("mensaje", correoRequestDTO.getMensaje());

            String contenidoHtml = "";

            if (correoRequestDTO.getTipo().equals("Registro")) {
                contenidoHtml = templateEngine.process("registro", context);
            }
            else{
                contenidoHtml = templateEngine.process("reserva", context);
            }

            helper.setText(contenidoHtml, true);

            javaMailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar el correo: " + e.getMessage(), e);
        }
    }

}
