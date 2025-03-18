package com.dh.Back.repository;

import com.dh.Back.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
import org.springframework.data.repository.query.Param;

@Repository
public interface IVehiculoRepository extends JpaRepository <Vehiculo, Long>{
    Optional<Vehiculo> findByMarcaAndModelo(String marca, String modelo);

    @Query("SELECT DISTINCT v.modelo FROM Vehiculo v WHERE v.marca = :m")
    List<String> findModelosByMarca(@Param("m") String marca);

    @Query("SELECT v FROM Vehiculo v WHERE " +
            "(COALESCE(:marca, '') = '' OR v.marca = :marca) AND " +
            "(COALESCE(:modelo, '') = '' OR v.modelo = :modelo) AND " +
            "(COALESCE(:pasajeros, 0) = 0 OR v.pasajeros >= :pasajeros)")
    List<Vehiculo> buscarPorCriterios(@Param("marca") String marca,
                                      @Param("modelo") String modelo,
                                      @Param("pasajeros") Integer pasajeros);


}
