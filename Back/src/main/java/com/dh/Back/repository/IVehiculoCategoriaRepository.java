package com.dh.Back.repository;

import com.dh.Back.entity.VehiculoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVehiculoCategoriaRepository extends JpaRepository<VehiculoCategoria, Long> {

}
