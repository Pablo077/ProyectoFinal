package com.dh.Back.entity;

import jakarta.persistence.*;

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

    @Column(name="mainImage")
    private String mainImage;

    @Column(name="files")
    private String filesName;

    public Vehiculo(){

    }

    public Vehiculo(
            String marca,
            String modelo,
            Integer pasajeros,
            Integer valijasGrandes,
            Integer valijasChicas,
            Caja caja,
            Direccion direccion,
            String mainImage,
            String files
            ){
        this.marca = marca;
        this.modelo = modelo;
        this.pasajeros = pasajeros;
        this.valijasGrandes = valijasGrandes;
        this.valijasChicas = valijasChicas;
        this.caja = caja;
        this.direccion = direccion;
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

    public String getFiles() {
        return filesName;
    }

    public void setFilesName(String filesName) {
        this.filesName = filesName;
    }



    /*
    @Override
    public String toString() {
        return "Vehiculo{" +
                "vehiculoId=" + id +
                ", marca='" + marca + '\'' +
                ", modelo='" + modelo + '\'' +
                ", pasajeros=" + pasajeros +
                ", valijasGrandes=" + valijasGrandes +
                ", valijasChicas=" + valijasChicas +
                ", caja=" + caja +
                ", direccion=" + direccion +
                '}';
    }

     */
}
