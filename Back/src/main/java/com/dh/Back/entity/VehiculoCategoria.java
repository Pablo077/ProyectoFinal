package com.dh.Back.entity;

import jakarta.persistence.*;

@Entity
@Table(name="vehiculoCategoria")
public class VehiculoCategoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehiculoCategoria_id")
    private Long id;

    @ManyToOne
    private Vehiculo vehiculo;

    @ManyToOne
    private Categoria categoria;

    @ManyToOne
    private User user;

    public VehiculoCategoria(){

    }

    public VehiculoCategoria(Vehiculo vehiculo, Categoria categoria, User user){
        this.vehiculo = vehiculo;
        this.categoria = categoria;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
