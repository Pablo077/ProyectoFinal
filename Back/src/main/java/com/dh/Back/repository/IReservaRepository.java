package com.dh.Back.repository;

import com.dh.Back.entity.Puntuacion;
import com.dh.Back.entity.Reserva;
import com.dh.Back.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface IReservaRepository extends JpaRepository<Reserva, Long> {
    @Query("SELECT r FROM Reserva r WHERE r.vehiculo.id = :vehiculoId " +
            "AND ((:fechaInicio BETWEEN r.fechaInicio AND r.fechaFin) " +
            "OR (:fechaFin BETWEEN r.fechaInicio AND r.fechaFin) " +
            "OR (r.fechaInicio BETWEEN :fechaInicio AND :fechaFin) " +
            "OR (r.fechaFin BETWEEN :fechaInicio AND :fechaFin))")
    List<Reserva> verificarDisponibilidad(@Param("vehiculoId") Long vehiculoId,
                                          @Param("fechaInicio") LocalDate fechaInicio,
                                          @Param("fechaFin") LocalDate fechaFin);
    Optional<List<Reserva>> findByVehiculo(Vehiculo vehiculo);

    @Query("SELECT r FROM Reserva r WHERE r.user.id = :userId AND r.vehiculo.id = :vehiculoId")
    List<Reserva> findByUserAndVehiculo(@Param("userId") Long userId, @Param("vehiculoId") Long vehiculoId);
}
