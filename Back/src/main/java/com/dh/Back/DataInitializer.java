package com.dh.Back;
import com.dh.Back.entity.*;
import com.dh.Back.repository.IUserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Crea tus entidades
//        MiEntidad entidad1 = new MiEntidad();
//        entidad1.setNombre("Dato Inicial 1");
//        entidad1.setDescripcion("Descripción del dato 1");
//        entityManager.persist(entidad1);
//
//        MiEntidad entidad2 = new MiEntidad();
//        entidad2.setNombre("Segundo Dato");
//        entidad2.setDescripcion("Otra descripción");
//        entityManager.persist(entidad2);

        // Puedes agregar más entidades aquí

        //Usuarios
        User admin = new User(1L,"Juan", "Perez", "admin@gmail.com", "1234", Role.ADMIN);
        User user = new User(2L, "Pedro", "Diaz", "user@gmail.com", "1234", Role.USER);


        //Caja
        Caja automatico = new Caja("Automático");
        entityManager.persist(automatico);

        Caja manualCaja = new Caja("Manual");
        entityManager.persist(manualCaja);

        Caja semiautomatico = new Caja("Semiautomático");
        entityManager.persist(semiautomatico);

        //Direccion
        Direccion asistido = new Direccion("Asistido");
        entityManager.persist(asistido);

        Direccion hibrido = new Direccion("Hibrido");
        entityManager.persist(hibrido);

        Direccion manualDireccion = new Direccion("Manual");
        entityManager.persist(manualDireccion);

        //Categoria
        Categoria furgoneta = new Categoria("Furgoneta","","");
        entityManager.persist(furgoneta);

        Categoria hatchbackCompacto = new Categoria("Hatchback compacto", "", "");
        entityManager.persist(hatchbackCompacto);

        Categoria hatchbackSubcompacto = new Categoria("Hatchback subcompacto","","");
        entityManager.persist(hatchbackSubcompacto);

        Categoria pickUp = new Categoria("Pick-up mediano","","");
        entityManager.persist(pickUp);

        Categoria sedan = new Categoria("Sedán compacto","","");
        entityManager.persist(sedan);

        Categoria suv = new Categoria("SUV","","");
        entityManager.persist(suv);

        //Vehiculo
        Vehiculo vehiculo1 = new Vehiculo("Citroen", "C3", 1.5f,5, 1, 2, automatico, asistido, hatchbackCompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        entityManager.persist(vehiculo1);

        Vehiculo vehiculo2 = new Vehiculo("Citroen", "C3 Aircross", 1.2f,5, 2, 4, automatico, asistido, suv, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        entityManager.persist(vehiculo2);

        Vehiculo vehiculo3 = new Vehiculo("Fiat", "Cronos Atractive", 1.3f,5, 1, 2, manualCaja, asistido, sedan, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        entityManager.persist(vehiculo3);

        Vehiculo vehiculo4 = new Vehiculo("Fiat", "Cronos Drive", 1.3f,5, 1, 2, automatico, asistido, sedan, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        entityManager.persist(vehiculo4);

        Vehiculo vehiculo5 = new Vehiculo("Ford", "Territory Titanium", 1.8f,5, 1, 2, automatico, asistido, suv, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        entityManager.persist(vehiculo5);

        Vehiculo vehiculo6 = new Vehiculo("Nissan", "Frontier S 4x4", 2.3f,5, 2, 4, automatico, asistido, pickUp, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        entityManager.persist(vehiculo6);

        Vehiculo vehiculo7 = new Vehiculo("Toyota", "Etios 5P", 1.5f,5, 1, 2, manualCaja, asistido, sedan, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        entityManager.persist(vehiculo7);

        Vehiculo vehiculo8 = new Vehiculo("Toyota", "Yaris", 1.5f,5, 2, 4, manualCaja, asistido, hatchbackSubcompacto, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        entityManager.persist(vehiculo8);

        Vehiculo vehiculo9 = new Vehiculo("Toyota", "Hiace", 2.5f,9, 2, 4, automatico, asistido, furgoneta, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        entityManager.persist(vehiculo9);

        Vehiculo vehiculo10 = new Vehiculo("Volkswagen", "Taos", 1.4f,5, 1, 2, automatico, asistido, suv, "Foto1.png", "{\"images\":[\"Foto1.png\",\"Foto2.png\",\"Foto3.png\",\"Foto4.png\",\"Foto5.png\"]}");
        entityManager.persist(vehiculo10);

        //Reserva
        LocalDate fechaInicio = new LocalDate.of(2025, 03, 20);
        LocalDate fechaFinal = new LocalDate.of(2025, 03, 24);
        Reserva reserva1 = new Reserva(user, vehiculo1, fechaInicio, fechaFinal);
        entityManager.persist(reserva1);
    }
}

