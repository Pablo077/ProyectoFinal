package com.dh.Back.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="Vehiculo")
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehiculo_id")
    private Long id;

    @Column(name="marca")
    private String marca;

    @Column(name="modelo")
    private String modelo;

    @Column(name="motor")
    private Float motor;

    @Column(name="pasajeros")
    private Integer pasajeros;

    @Column(name="valijasGrandes")
    private Integer valijasGrandes;

    @Column(name="valijasChicas")
    private Integer valijasChicas;

    @ManyToOne
    private Caja caja;

    @ManyToOne
    private Direccion direccion;

    @ManyToOne
    private Categoria categoria;

    @Column(name="mainImage")
    private String mainImage;

    @Column(name="files")
    private String filesName;

    @OneToMany(mappedBy = "vehiculo")
    private Set<VehiculoCategoria> vehiculoCategorias = new HashSet<>();

    @OneToMany(mappedBy = "vehiculo")
    private Set<Caracteristica> caracteristicas = new HashSet<>();

    public Vehiculo(){

    }

    public Vehiculo(
            String marca,
            String modelo,
            Float motor,
            Integer pasajeros,
            Integer valijasGrandes,
            Integer valijasChicas,
            Caja caja,
            Direccion direccion,
            Categoria categoria,
            String mainImage,
            String files
            ){
        this.marca = marca;
        this.modelo = modelo;
        this.motor = motor;
        this.pasajeros = pasajeros;
        this.valijasGrandes = valijasGrandes;
        this.valijasChicas = valijasChicas;
        this.caja = caja;
        this.direccion = direccion;
        this.categoria = categoria;
        this.mainImage = mainImage;
        this.filesName = files;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Float getMotor() {
        return motor;
    }

    public void setMotor(Float motor) {
        this.motor = motor;
    }

    public Integer getPasajeros() {
        return pasajeros;
    }

    public void setPasajeros(Integer pasajeros) {
        this.pasajeros = pasajeros;
    }

    public Integer getValijasGrandes() {
        return valijasGrandes;
    }

    public void setValijasGrandes(Integer valijasGrandes) {
        this.valijasGrandes = valijasGrandes;
    }

    public Integer getValijasChicas() {
        return valijasChicas;
    }

    public void setValijasChicas(Integer valijasChicas) {
        this.valijasChicas = valijasChicas;
    }

    public Caja getCaja() {
        return caja;
    }

    public void setCaja(Caja caja) {
        this.caja = caja;
    }

    public Direccion getDireccion() {
        return direccion;
    }

    public void setDireccion(Direccion direccion) {
        this.direccion = direccion;
    }

    public String getMainImage() {
        return mainImage;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }

    public String getFilesName() {
        return filesName;
    }

    public void setFilesName(String filesName) {
        this.filesName = filesName;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}
