package com.dh.Back.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoria_id")
    private Long id;

    @Column(name="nombre")
    private String nombre;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "categoria")
    private Set<VehiculoCategoria> vehiculoCategorias = new HashSet<>();

    public Categoria() {

    }

    public Categoria(String nombre, User user){
        this.nombre = nombre;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<VehiculoCategoria> getVehiculoCategorias() {
        return vehiculoCategorias;
    }

    public void setVehiculoCategorias(Set<VehiculoCategoria> vehiculoCategorias) {
        this.vehiculoCategorias = vehiculoCategorias;
    }
}
