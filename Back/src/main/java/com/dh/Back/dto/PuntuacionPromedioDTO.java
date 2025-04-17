package com.dh.Back.dto;

public class PuntuacionPromedioDTO {
    private Long vehiculoId;
    private Double promedio;
    private Long cantidad;

    public PuntuacionPromedioDTO(Long vehiculoId, Double promedio, Long cantidad) {
        this.vehiculoId = vehiculoId;
        this.promedio = promedio;
        this.cantidad = cantidad;
    }


    public Long getVehiculoId() {
        return vehiculoId;
    }

    public void setVehiculoId(Long vehiculoId) {
        this.vehiculoId = vehiculoId;
    }

    public Double getPromedio() {
        return promedio;
    }

    public void setPromedio(Double promedio) {
        this.promedio = promedio;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
