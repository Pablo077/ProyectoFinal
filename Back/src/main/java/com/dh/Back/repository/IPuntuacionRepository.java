package com.dh.Back.repository;

import com.dh.Back.dto.PuntuacionPromedioDTO;
import com.dh.Back.entity.Favorito;
import com.dh.Back.entity.Puntuacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPuntuacionRepository extends JpaRepository<Puntuacion, Long> {
    @Query("SELECT p FROM Puntuacion p WHERE p.reserva.user.id = :userId AND p.reserva.vehiculo.id = :vehiculoId")
    List<Puntuacion> findByUserAndVehiculo(@Param("userId") Long userId,
                                         @Param("vehiculoId") Long vehiculoId
                                         );

    @Query("SELECT new com.dh.Back.dto.PuntuacionPromedioDTO(p.reserva.vehiculo.id, AVG(p.valor), COUNT(p)) " +
            "FROM Puntuacion p GROUP BY p.reserva.vehiculo.id")
    List<PuntuacionPromedioDTO> puntuacionPromedioByVehiculo();


}
