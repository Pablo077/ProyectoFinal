package com.dh.Back.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="puntuacion")
public class Puntuacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="puntuacion_id")
    private Long id;

    @ManyToOne
    private Reserva reserva;

    @Column(name="valor")
    private Integer valor;

    @Column(name="fechaPuntuacion")
    private LocalDate fechaPuntuacion;

    @Column(name="resena")
    private String resena;

    public Puntuacion(){

    }

    public Puntuacion(
            Reserva reserva,
            Integer valor,
            LocalDate fechaPuntuacion,
            String resena
    ){
        this.reserva = reserva;
        this.valor = valor;
        this.fechaPuntuacion = fechaPuntuacion;
        this.resena = resena;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Reserva getReserva() {
        return reserva;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
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
