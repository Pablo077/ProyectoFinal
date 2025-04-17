package com.dh.Back.dto;
import java.time.LocalDate;

public class BodySavePuntuacionDTO {
    private Long reservaId;
    private Integer valor;
    private LocalDate fechaPuntuacion;
    private String resena;

    public Long getReservaId() {
        return reservaId;
    }

    public void setReservaId(Long reservaId) {
        this.reservaId = reservaId;
    }

    public Integer getValor() {
        return valor;
    }

    public void setValor(Integer valor) {
        this.valor = valor;
    }

    public LocalDate getFechaPuntuacion() {
        return fechaPuntuacion;
    }

    public void setFechaPuntuacion(LocalDate fechaPuntuacion) {
        this.fechaPuntuacion = fechaPuntuacion;
    }

    public String getResena() {
        return resena;
    }

    public void setResena(String resena) {
        this.resena = resena;
    }
}
