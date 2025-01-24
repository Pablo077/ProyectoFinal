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

    public Vehiculo(){

    }

    public Vehiculo(
            String marca,
            String modelo,
            Integer pasajeros,
            Integer valijasGrandes,
            Integer valijasChicas
            ){}

    public void setMarca(String marca){this.marca = marca;}

    public void setModelo(String modelo){this.modelo = modelo;}

    public void setPasajeros(Integer pasajeros){this.pasajeros = pasajeros;}

    public void setValijasGrandes(Integer valijasGrandes){this.valijasGrandes = valijasGrandes;}

    public void setValijasChicas(Integer valijasChicas){this.valijasChicas = valijasChicas;}

    public void setCaja(Caja caja){this.caja = caja;}

    public void setDireccion(Direccion direccion){this.direccion= direccion;}
}
