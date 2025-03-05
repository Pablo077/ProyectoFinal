package com.dh.Back.repository;

import com.dh.Back.entity.Caracteristica;
import com.dh.Back.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface ICaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
    List<Caracteristica> findByVehiculo(Vehiculo vehiculo);
}
