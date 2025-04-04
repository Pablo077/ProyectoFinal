package com.dh.Back.repository;

import com.dh.Back.entity.Favorito;
import com.dh.Back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFavoritoRepository extends JpaRepository<Favorito, Long> {
    @Query("SELECT f FROM Favorito f WHERE f.user.id = :userId")
    List<Favorito> findByUser(@Param("userId") Long userId);
}
