package com.dh.Back.data;
import java.util.List;
import com.dh.Back.entity.Caja;
import com.dh.Back.entity.Categoria;
import com.dh.Back.entity.Direccion;
import com.dh.Back.entity.Vehiculo;
import org.springframework.stereotype.Component;

@Component
public class VehiculoDataLoader {
    public List<Vehiculo> getVehiculos() {
        Caja caja1 = new Caja();
        caja1.setId(1L);
        caja1.setTipo("Automatico");

        Caja caja2 = new Caja();
        caja2.setId(2L);
        caja2.setTipo("Manual");

        Direccion direccion = new Direccion();
        direccion.setId(1L);
        direccion.setTipo("Asistido");

        Categoria furgoneta = new Categoria();
        furgoneta.setId(1L);
        furgoneta.setNombre("Furgoneta");
        furgoneta.setDescripcion("");

        Categoria hatchbackCompacto = new Categoria();
        hatchbackCompacto.setId(2L);
        hatchbackCompacto.setNombre("Hatchback compacto");
        hatchbackCompacto.setDescripcion("");

        Categoria hatchbackSubcompacto = new Categoria();
        hatchbackSubcompacto.setId(3L);
        hatchbackSubcompacto.setNombre("Hatchback subcompacto");
        hatchbackSubcompacto.setDescripcion("");

        Categoria pickUp = new Categoria();
        pickUp.setId(4L);
        pickUp.setNombre("Pick-up mediano");
        pickUp.setDescripcion("");

        Categoria sedan = new Categoria();
        sedan.setId(5L);
        sedan.setNombre("Sedán compacto");
        sedan.setDescripcion("");

        Categoria suv = new Categoria();
        suv.setId(6L);
        suv.setNombre("SUV");
        suv.setDescripcion("");

        return List.of(
                new Vehiculo("Citroen", "C3", 1.5f,5, 1, 2, caja1, direccion, hatchbackCompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"),
                new Vehiculo("Citroen", "C3 Aircross", 1.2f,5, 2, 4, caja1, direccion, suv, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"),
                new Vehiculo("Fiat", "Cronos Atractive", 1.3f,5, 1, 2, caja2, direccion, sedan, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"),
                new Vehiculo("Fiat", "Cronos Drive", 1.3f,5, 1, 2, caja1, direccion, sedan, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"),
                new Vehiculo("Ford", "Territory Titanium", 1.8f,5, 1, 2, caja1, direccion, suv, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"),

                new Vehiculo("Nissan", "Frontier S 4x4", 2.3f,5, 2, 4, caja1, direccion, pickUp, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"),
                new Vehiculo("Toyota", "Etios 5P", 1.5f,5, 1, 2, caja2, direccion, sedan, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"),
                new Vehiculo("Toyota", "Yaris", 1.5f,5, 2, 4, caja2, direccion, hatchbackSubcompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"),
                new Vehiculo("Toyota", "Hiace", 2.5f,9, 2, 4, caja1, direccion, furgoneta, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}"),
                new Vehiculo("Volkswagen", "Taos", 1.4f,5, 1, 2, caja1, direccion, suv, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}")
        );
    }
}
