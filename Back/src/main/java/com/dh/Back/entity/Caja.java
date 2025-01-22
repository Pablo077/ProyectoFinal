package com.dh.Back.entity;

import jakarta.persistence.*;

@Entity
@Table(name="caja")
public class Caja {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "caja_id")
    private Long id;

    @Column(name="tipo")
    private String tipo;

    public Caja(){

    }
    public Caja(String tipo) {
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
