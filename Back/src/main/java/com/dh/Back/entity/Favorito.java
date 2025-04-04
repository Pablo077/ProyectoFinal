package com.dh.Back.entity;

import jakarta.persistence.*;

@Entity
@Table(name="favorito")
public class Favorito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="favorito_id")
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Vehiculo vehiculo;

    public Favorito(){

    }

    public Favorito(User user, Vehiculo vehiculo){
        this.user = user;
        this.vehiculo = vehiculo;
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
}
