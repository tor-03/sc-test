package com.truzak.standard_carpets.repo;

import com.truzak.standard_carpets.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TypeRepo extends JpaRepository<Type,Integer> {


    Type findByName(String name);
    List<Type> findAllByOrderByPositionAsc();

    @Modifying
    @Query("UPDATE Type t SET t.position = t.position + 1 WHERE t.position >= :position")
    void incrementPositionsFrom(@Param("position") int position);

    @Modifying
    @Query("UPDATE Type t SET t.position = t.position - 1 WHERE t.position > :position")
    void decrementPositionsAfter(@Param("position") int position);

    @Modifying
    @Query("SELECT t, c FROM Type t LEFT JOIN t.carpets c ON c.id = (SELECT MIN(c2.id) FROM Carpet c2 WHERE c2.type.id = t.id) ORDER BY t.position ASC")
    List<Object[]> findAllTypesWithOneCarpet();

    @Modifying
    @Query("SELECT t FROM Type t JOIN t.carpets c GROUP BY t HAVING COUNT(c) > 0")
    List<Type> findTypesWithCarpets();
}
