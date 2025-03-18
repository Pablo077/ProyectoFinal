package com.dh.Back.entity;

import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name="reserva")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reserva_id")
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Vehiculo vehiculo;

    @Column(name="fechaInicio")
    private LocalDate fechaInicio;

    @Column(name="fechaFin")
    private LocalDate fechaFin;

    public Reserva(){

    }

    public Reserva(User user, Vehiculo vehiculo, LocalDate fechaInicio, LocalDate fechaFin){
        this.user = user;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }
}
