package com.dh.Back.repository;

import com.dh.Back.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface IVehiculoRepository extends JpaRepository <Vehiculo, Long>{
    Optional<Vehiculo> findByMarcaAndModelo(String marca, String modelo);
}
