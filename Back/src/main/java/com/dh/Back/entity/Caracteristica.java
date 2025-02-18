package com.dh.Back.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="caracteristica")
public class Caracteristica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "caracteristica_id")
    private Long id;

    @Column(name="nombre")
    private String nombre;

    @Column(name="icono")
    private Integer icono;

    @ManyToOne
    private Vehiculo vehiculo;

    public Caracteristica(){

    }

    public Caracteristica(String nombre, Integer icono, Vehiculo vehiculo ){
        this.nombre = nombre;
        this.icono = icono;
        this.vehiculo = vehiculo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getIcono() {
        return icono;
    }

    public void setIcono(Integer icono) {
        this.icono = icono;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }
}
