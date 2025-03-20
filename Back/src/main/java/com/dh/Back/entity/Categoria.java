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

    @Column(name="descripcion")
    private String descripcion;

    @Column(name="mainImage")
    private String mainImage;

    @OneToMany(mappedBy = "categoria")
    private Set<VehiculoCategoria> vehiculoCategorias = new HashSet<>();

    public Categoria() {

    }

    public Categoria(String nombre, String mainImage, String descripcion){
        this.nombre = nombre;
        this.mainImage = mainImage;
        this.descripcion = descripcion;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getMainImage() {
        return mainImage;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }

    public Set<VehiculoCategoria> getVehiculoCategorias() {
        return vehiculoCategorias;
    }

    public void setVehiculoCategorias(Set<VehiculoCategoria> vehiculoCategorias) {
        this.vehiculoCategorias = vehiculoCategorias;
    }
}
