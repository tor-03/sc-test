package com.truzak.standard_carpets.repo;

import com.truzak.standard_carpets.entity.Carpet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarpetRepo extends JpaRepository<Carpet, Integer> {

    @Query("SELECT c FROM Carpet c WHERE c.type.id = :typeId")
    List<Carpet> findByTypeId(@Param("typeId") int typeId);

    @Query("SELECT SUM(c.imgSize) FROM Carpet c")
    Long getTotalImageSize();


}
