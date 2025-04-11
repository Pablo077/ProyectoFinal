package com.dh.Back.repository;

import com.dh.Back.entity.Puntuacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPuntuacionRepository extends JpaRepository<Puntuacion, Long> {
}
