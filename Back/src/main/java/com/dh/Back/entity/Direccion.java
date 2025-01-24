package com.dh.Back.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="direccion")
public class Direccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "direccion_id")
    private Long id;

    @Column(name="tipo")
    private String tipo;

    @OneToMany(mappedBy = "direccion")
    private Set<Vehiculo> vehiculos = new HashSet<>();

    public Direccion(){

    }
    public Direccion(String tipo) {
        this.tipo = tipo;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTipo() {this.tipo = tipo;}

    public String getTipo () {return tipo;}
}
