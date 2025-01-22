package com.dh.Back.repository;

import com.dh.Back.entity.Caja;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICajaRepository extends JpaRepository<Caja, Long> {

}
