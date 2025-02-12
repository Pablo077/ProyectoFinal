package com.dh.Back.dto;

public class VehiculoCategoriaDTO {
    private Long vehiculo_id;
    private Long categoria_id;
    private Long user_id;

    public Long getVehiculo_id() {
        return vehiculo_id;
    }

    public void setVehiculo_id(Long vehiculo_id) {
        this.vehiculo_id = vehiculo_id;
    }

    public Long getCategoria_id() {
        return categoria_id;
    }

    public void setCategoria_id(Long categoria_id) {
        this.categoria_id = categoria_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
